import React, { useState } from "react";

const Addendum = () => {
    const [form, setForm] = useState({
        contractnum: "",
        fullname: "",
        address: "",
        plan: "",
        amount: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    return (
        <div className="p-6 max-w-xl mx-auto border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Addendum Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-medium mb-1">Contract Number</label>
                    <input
                        type="text"
                        name="contractnum"
                        value={form.contractnum}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Enter contract number"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Enter full name"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Enter address"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Plan</label>
                    <input
                        type="text"
                        name="plan"
                        value={form.plan}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Enter plan"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        placeholder="Enter amount"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Addendum;
