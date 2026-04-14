import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddSubscriber = () => {
    const [subscriber, setSubscriber] = useState({
        created_at:'',
        name: '',
        email: '',
        password: '',
        address: '',
        landmark: '',
        category_id: '',
        plan: '',
        contactnumber: '',
        contractnumber: '',
        napnumber: '',
        portsequence: '',
        meters: ''
    });

    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                    if (result.data.Result.length > 0) {
                        setSubscriber((prev) => ({
                            ...prev,
                            category_id: result.data.Result[0].id
                        }));
                    }
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ validation
        if (!subscriber.created_at || !subscriber.name || !subscriber.email || !subscriber.password ||
            !subscriber.address || !subscriber.landmark || !subscriber.category_id ||
            !subscriber.plan || !subscriber.contactnumber || !subscriber.contractnumber ||
            !subscriber.napnumber || !subscriber.portsequence || !subscriber.meters) {
            alert("Please fill out all required fields.");
            return;
        }

        axios.post('http://localhost:3000/auth/add_subscriber', subscriber)
            .then(result => {
                if (result.data.Status) {
                    alert('✅ Subscriber added successfully!');
                    navigate('/dashboard/subscriber');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
                    Add Subscriber
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name, Email, Password */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input label="Date Installed" required onChange={(e) => setSubscriber({ ...subscriber, created_at: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input label="Name" required onChange={(e) => setSubscriber({ ...subscriber, name: e.target.value })} />
                        <Input type="email" label="Email" required onChange={(e) => setSubscriber({ ...subscriber, email: e.target.value })} />
                        <Input type="password" label="Password" required onChange={(e) => setSubscriber({ ...subscriber, password: e.target.value })} />
                    </div>

                    {/* Address & Landmark */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Address" required onChange={(e) => setSubscriber({ ...subscriber, address: e.target.value })} />
                        <Input label="Landmark" required onChange={(e) => setSubscriber({ ...subscriber, landmark: e.target.value })} />
                    </div>

                    {/* Category, Plan, Contact, Contract */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category *
                            </label>
                            <select
                                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                                value={subscriber.category_id}
                                onChange={(e) => setSubscriber({ ...subscriber, category_id: e.target.value })}
                            >
                                {category.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Plan Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Plan *
                            </label>
                            <select
                                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                                value={subscriber.plan}
                                onChange={(e) => setSubscriber({ ...subscriber, plan: e.target.value })}
                            >
                                <option value="">-- Select Plan --</option>
                                <option value="Cable Only">Cable Only</option>
                                <option value="PLAN 888 (68MBPS)">PLAN 888 (68MBPS)</option>
                                <option value="PLAN 1 (200MBPS)">PLAN 1 (200MBPS)</option>
                                <option value="PLAN 2 (500MBPS)">PLAN 2 (500MBPS)</option>
                                <option value="PLAN 3 (800MBPS)">PLAN 3 (800MBPS)</option>
                            </select>
                        </div>

                        <Input label="Contact Number" required onChange={(e) => setSubscriber({ ...subscriber, contactnumber: e.target.value })} />
                        <Input label="Contract Number" required onChange={(e) => setSubscriber({ ...subscriber, contractnumber: e.target.value })} />
                    </div>

                    {/* NAP, Port, Fiber */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input label="NAP Number" required onChange={(e) => setSubscriber({ ...subscriber, napnumber: e.target.value })} />
                        <Input label="Port & Sequence" required onChange={(e) => setSubscriber({ ...subscriber, portsequence: e.target.value })} />
                        <Input label="Fiber Meters" required onChange={(e) => setSubscriber({ ...subscriber, meters: e.target.value })} />
                    </div>

                    {/* Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition"
                        >
                            Add Subscriber
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Input = ({ label, type = "text", required, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && "*"}
        </label>
        <input
            type={type}
            required={required}
            onChange={onChange}
            className="block w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
    </div>
);

export default AddSubscriber;
