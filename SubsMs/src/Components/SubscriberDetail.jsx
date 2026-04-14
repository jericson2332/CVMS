import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const SubscriberDetail = () => {
    const { id } = useParams(); // get subscriber ID from URL
    const navigate = useNavigate();
    const [subscriber, setSubscriber] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/auth/subscriber/${id}`)
            .then((result) => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSubscriber(result.data.Result[0]);
                } else {
                    toast.error("Subscriber not found");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to fetch subscriber details");
            });
    }, [id]);

    if (!subscriber) {
        return (
            <div className="p-6 min-h-screen flex justify-center items-center">
                <p className="text-gray-500">Loading subscriber details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-600 hover:underline mb-4"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
            </button>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow p-6 w-[1520px] mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-blue-800">
                    Subscriber Details
                </h2>

                {/* Grid layout for fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Detail label="Name:" value={subscriber.name} />
                    <Detail label="Email:" value={subscriber.email} />
                    <Detail label="Address:" value={subscriber.address} />
                    <Detail label="Landmark:" value={subscriber.landmark} />
                    <Detail label="Plan:" value={subscriber.plan} />
                    <Detail label="Contact Number:" value={subscriber.contactnumber} />
                    <Detail label="Contract Number:" value={subscriber.contractnumber} />
                    <Detail label="Nap Number:" value={subscriber.napnumber} />
                    <Detail label="Port & Sequence:" value={subscriber.portsequence} />
                    <Detail label="Fiber Meters:" value={subscriber.meters} />
                    <Detail label="Created At:" value={subscriber.created_at} />
                    <Detail label="Remarks" value={subscriber.remark} />
                </div>
            </div>
        </div>
    );
};

// 🔹 Reusable Detail field component
const Detail = ({ label, value }) => (
    <div>
        <p className="text-lg font-bold text-gray-600">{label}</p>
        <p className="text-base text-gray-900">
            {value ? value : <span className="text-gray-400">N/A</span>}
        </p>
    </div>
);

export default SubscriberDetail;
