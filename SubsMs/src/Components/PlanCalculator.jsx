import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BillingCalendar.css";
import {
    format,
    differenceInCalendarDays,
    addMonths,
} from "date-fns";
import { CreditCard, CalendarDays, Receipt, Zap } from "lucide-react";

const plans = [
    { id: "cable", name: "Cable Only", price: 350, type: "cable" },
    { id: "plan888", name: "Plan 888 (up to 68 Mbps)", price: 800, type: "internet" },
    { id: "plan1", name: "Plan 1 (up to 200 Mbps)", price: 1260, type: "internet" },
    { id: "plan2", name: "Plan 2 (up to 500 Mbps)", price: 1600, type: "internet" },
    { id: "plan3", name: "Plan 3 (up to 800 Mbps)", price: 2100, type: "internet" },
];

const cutoffDays = [7, 14, 21, 28];
const INSTALLATION_FEE_INTERNET = 1800;
const INSTALL_PARTIAL_MONTHS = 6;
const INSTALLATION_FEE_CABLE = 500;
const PROMO_DISCOUNT = 300;

const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
};

const coverageFromDue = (dueDate, cutoffDay) => {
    const start = addMonths(dueDate, -1);
    start.setDate(start.getDate() + 1);
    const end = new Date(dueDate);
    return `${format(start, "MMM d")} - ${format(end, "MMM d")}`;
};

const BillingCalendar = () => {
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    const [startDate, setStartDate] = useState(new Date());
    const [cutoffDay, setCutoffDay] = useState(7);
    const [withDeposit, setWithDeposit] = useState(false);
    const [installFullPayment, setInstallFullPayment] = useState(true);
    const [existingCableBill, setExistingCableBill] = useState(""); // ✅ NEW STATE
    const [existingCoverageStart, setExistingCoverageStart] = useState(""); // ✅ NEW
    const [existingCoverageEnd, setExistingCoverageEnd] = useState("");

    const isCable = selectedPlan.type === "cable";
    const dailyRate = selectedPlan.price / 30;
    const promoMonths = installFullPayment ? 6 : 3;

    const getNextCutoff = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        let cutoff = new Date(year, month, cutoffDay);
        if (date > cutoff) cutoff = new Date(year, month + 1, cutoffDay);
        return cutoff;
    };

    const getBillingSchedule = (start, cycles = 6) => {
        let adjustments = [];
        let upcoming = [];
        let promoUsed = 0;

        let currentDate = new Date(start);
        let cutoffDate = getNextCutoff(currentDate);

        const prevCutoff = new Date(cutoffDate);
        prevCutoff.setMonth(prevCutoff.getMonth() - 1);

        if (currentDate.getDate() === cutoffDay) {
            adjustments.push({
                dueDate: cutoffDate,
                type: "Full Month",
                amount: selectedPlan.price,
                coverage: coverageFromDue(cutoffDate, cutoffDay),
            });
            currentDate = cutoffDate;
        } else if (currentDate.getDate() === prevCutoff.getDate() + 1) {
            const basePrice =
                !isCable && promoUsed < promoMonths
                    ? selectedPlan.price - PROMO_DISCOUNT
                    : selectedPlan.price;

            adjustments.push({
                dueDate: cutoffDate,
                type: "Full Month",
                amount: basePrice,
                coverage: `${format(currentDate, "MMM d")} - ${format(cutoffDate, "MMM d")}`,
                promoApplied: !isCable && promoUsed < promoMonths,
            });

            if (!isCable) promoUsed++;
            currentDate = cutoffDate;
        } else {
            const days = differenceInCalendarDays(cutoffDate, currentDate) + 1;
            const proratedBase = (selectedPlan.price / 30) * days;
            const prorated = Math.round(proratedBase);

            adjustments.push({
                dueDate: cutoffDate,
                type: "Prorated",
                amount: prorated,
                days,
                coverage: `${format(currentDate, "MMM d")} - ${format(cutoffDate, "MMM d")}`,
                details: {
                    dailyRate: Math.round(dailyRate),
                    base: Math.round(proratedBase),
                },
            });

            if (!isCable && days < 10) {
                const discounted =
                    promoUsed < promoMonths ? selectedPlan.price - PROMO_DISCOUNT : selectedPlan.price;

                adjustments.push({
                    dueDate: cutoffDate,
                    type: "Advance Full Month",
                    amount: discounted,
                    coverage: coverageFromDue(addMonths(cutoffDate, 1), cutoffDay),
                    promoApplied: promoUsed < promoMonths,
                });

                promoUsed++;
            }

            currentDate = cutoffDate;
        }

        for (let i = 0; i < cycles; i++) {
            let basePrice = selectedPlan.price;

            if (!isCable && promoUsed < promoMonths) {
                basePrice -= PROMO_DISCOUNT;
                promoUsed++;
            }

            let installFee = 0;
            if (!isCable && !installFullPayment && i < INSTALL_PARTIAL_MONTHS) {
                installFee = INSTALLATION_FEE_INTERNET / INSTALL_PARTIAL_MONTHS;
            }

            upcoming.push({
                dueDate: currentDate,
                type: "Full Month",
                amount: basePrice + installFee,
                coverage: coverageFromDue(currentDate, cutoffDay),
                details: { base: basePrice, install: installFee },
            });

            currentDate = addMonths(currentDate, 1);
        }

        return { adjustments, upcoming };
    };

    const { adjustments, upcoming } = getBillingSchedule(startDate, 6);

    const depositAmount = isCable
        ? withDeposit ? selectedPlan.price * 2 : 0
        : withDeposit ? selectedPlan.price : 0;

    const adjustmentsForInitial = adjustments.filter(
        (b) => b.type === "Prorated" || b.type === "Advance Full Month" || b.type === "Full Month"
    );
    const adjustmentsTotal = adjustmentsForInitial.reduce((sum, b) => sum + b.amount, 0);

    const installationFeeInitial = isCable
        ? INSTALLATION_FEE_CABLE
        : installFullPayment
            ? INSTALLATION_FEE_INTERNET
            : INSTALLATION_FEE_INTERNET / INSTALL_PARTIAL_MONTHS;

    // ✅ Include existing cable bill in total
    const initialPayment =
        installationFeeInitial + depositAmount + adjustmentsTotal + (Number(existingCableBill) || 0);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                <CreditCard size={24} /> Internet & Cable Billing Calculator
            </h2>

            {/* Plan Selector */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl border">
                    <label className="block text-sm font-medium mb-2">Select Plan</label>
                    <select
                        className="w-full border rounded-lg px-3 py-2"
                        value={selectedPlan.id}
                        onChange={(e) =>
                            setSelectedPlan(plans.find((p) => p.id === e.target.value))
                        }
                    >
                        {plans.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                                {plan.name} — ₱{plan.price}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border">
                    <label className="block text-sm font-medium mb-2">Select Cut-off</label>
                    <select
                        className="w-full border rounded-lg px-3 py-2"
                        value={cutoffDay}
                        onChange={(e) => setCutoffDay(Number(e.target.value))}
                    >
                        {cutoffDays.map((day) => (
                            <option key={day} value={day}>
                                Every {day}
                                {getOrdinal(day)} of the Month
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Deposit & Installation + Existing Bill */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-xl border">
                    <input
                        type="checkbox"
                        checked={withDeposit}
                        onChange={() => setWithDeposit(!withDeposit)}
                    />
                    <label>
                        {isCable
                            ? `Add 2 Months Deposit (₱${selectedPlan.price * 2})`
                            : `Add 1 Month Deposit (₱${selectedPlan.price})`}
                    </label>
                </div>

                {!isCable && (
                    <div className="bg-gray-50 p-4 rounded-xl border">
                        <label className="block text-sm font-medium mb-2">
                            Installation Payment
                        </label>
                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={installFullPayment ? "full" : "partial"}
                            onChange={(e) => setInstallFullPayment(e.target.value === "full")}
                        >
                            <option value="full">
                                Full Payment — ₱{INSTALLATION_FEE_INTERNET} (₱300 off first 6 months)
                            </option>
                            <option value="partial">
                                Partial Payment — ₱{INSTALLATION_FEE_INTERNET} spread over 6 months
                            </option>
                        </select>
                    </div>
                )}

                {/* ✅ Existing Bill - Cable with manual coverage */}
                <div className="bg-gray-50 p-4 rounded-xl border space-y-3">
                    <label className="block text-sm font-medium">Existing Bill - Cable</label>
                    <input
                        type="text"
                        placeholder="Enter amount"
                        value={existingCableBill}
                        onChange={(e) => setExistingCableBill(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Coverage Start</label>
                            <input
                                type="date"
                                value={existingCoverageStart}
                                onChange={(e) => setExistingCoverageStart(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Coverage End</label>
                            <input
                                type="date"
                                value={existingCoverageEnd}
                                onChange={(e) => setExistingCoverageEnd(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Calendar */}
            <div className="bg-gray-50 p-4 rounded-xl border">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <CalendarDays size={20} /> Select Start Date
                </h3>
                <Calendar onChange={setStartDate} value={startDate} />
            </div>

            {/* Initial Payment */}
            <div className="bg-green-50 border border-green-300 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Zap size={20} /> Initial Payment (Due on Start)
                </h3>
                <ul className="space-y-2 text-green-700">
                    <li>Installation Fee: ₱{installationFeeInitial}</li>
                    {withDeposit && <li>Deposit: ₱{depositAmount}</li>}
                    {existingCableBill && (
                        <li>
                            Existing Cable Bill: ₱{existingCableBill}{" "}
                            {existingCoverageStart && existingCoverageEnd && (
                                <span className="text-gray-600 text-sm">
                                    (Coverage: {format(new Date(existingCoverageStart), "MMM d, yyyy")} -{" "}
                                    {format(new Date(existingCoverageEnd), "MMM d, yyyy")})
                                </span>
                            )}
                        </li>
                    )}
                    {adjustments.map((bill, index) => (
                        <li key={index}>
                            {bill.type}: ₱{bill.amount}{" "}
                            {bill.coverage ? ` (Coverage: ${bill.coverage})` : ""}
                            {bill.promoApplied && (
                                <span className="ml-2 text-xs bg-yellow-300 px-2 py-0.5 rounded">
                                    Promo Applied
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-xl font-bold text-green-900">
                    Total Initial Payment: ₱{initialPayment}
                </p>
            </div>

            {/* Upcoming Bills */}
            <div className="bg-gray-50 p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Receipt size={20} /> Upcoming Billing Schedule
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-3 py-2 border">Due Date</th>
                                <th className="px-3 py-2 border">Amount</th>
                                <th className="px-3 py-2 border">Coverage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcoming.map((bill, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 border">{format(bill.dueDate, "MMMM d, yyyy")}</td>
                                    <td className="px-3 py-2 border font-semibold">₱{bill.amount}</td>
                                    <td className="px-3 py-2 border">{bill.coverage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BillingCalendar;
