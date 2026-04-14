import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const ApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/auth/application/${id}`)
            .then((res) => {
                if (res.data.Status) {
                    setApplication(res.data.Result);
                } else {
                    console.error(res.data.Error || "Application not found");
                }
            })
            .catch((err) => {
                console.error("Error fetching application:", err);
            });
    }, [id]);

    if (!application) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading application details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-600 hover:underline mb-2"
            >
                <ArrowLeft className="w-5 h-5 mr-2 " />
                Back
            </button>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6 text-blue-800">
                    Application Details
                </h2>

                {/* Grid layout for fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Detail label="Category Plan:" value={application.category} />
                    <Detail label="Surname:" value={application.surname} />
                    <Detail label="First Name:" value={application.firstname} />
                    <Detail label="Middle Name:" value={application.middlename} />
                    <Detail label="Date of Birth:" value={application.dateofbirth} />
                    <Detail label="Place of Birth:" value={application.placeofbirth} />
                    <Detail label="Gender:" value={application.gender} />
                    <Detail label="Civil Status:" value={application.civilstatus} />
                    <Detail label="Mother’s Maiden Name:" value={application.mothermaidenname} />
                    <Detail label="Email:" value={application.email} />
                    <Detail label="Billing Address:" value={application.billingadd} />
                    <Detail label="Address:" value={application.address} />
                    <Detail label="Home Number:" value={application.homenumber} />
                    <Detail label="Mobile Number:" value={application.mobilenumber} />
                    <Detail label="Landmark:" value={application.landmark} />
                    <Detail label="Employer Name:" value={application.employername} />
                    <Detail label="Employer Address:" value={application.employeraddress} />
                    <Detail label="Employer Number:" value={application.officenumber} />
                    <Detail label="Occupation:" value={application.occupation} />
                </div>
            </div>
        </div>
    );
};

// 🔹 Reusable detail field component
const Detail = ({ label, value }) => (
    <div>
        <p className="text-lg font-bold text-gray-600">{label}</p>
        <p className="text-base text-gray-900">
            {value ? value : <span className="text-gray-400">N/A</span>}
        </p>
    </div>
);

export default ApplicationDetail;
