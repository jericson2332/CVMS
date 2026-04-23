import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditSubscriber = () => {
    const { id } = useParams()
    const [subscriber, setSubscriber] = useState({
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
        meters: '',
        remark: '',
        created_at: ''
    })

    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/subscriber/' + id)
            .then(result => {
                const data = result.data.Result[0]
                setSubscriber({
                    status: data.status,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    address: data.address,
                    landmark: data.landmark,
                    category_id: data.category_id,
                    plan: data.plan,
                    contactnumber: data.contactnumber,
                    contractnumber: data.contractnumber,
                    napnumber: data.napnumber,
                    portsequence: data.portsequence,
                    meters: data.meters,
                    remark: data.remark,
                    created_at: data.created_at
                })
            }).catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_subscriber/' + id, subscriber)
            .then(result => {
                if (result.data.Status) {
                    alert('✅ Subscriber info updated successfully!')
                    navigate('/dashboard/subscriber')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
                    Edit Subscriber Info
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name, Email, Password */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                               Status
                            </label>
                            <select
                                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                value={subscriber.status}
                                onChange={(e) => setSubscriber({ ...subscriber, status: e.target.value })}
                            >
                                <option value="">-- Select Status --</option>
                                <option value="Install">Active</option>
                                <option value="Reconnect">Reconnect</option>
                                <option value="Disconnect">Disconnect</option>
                            </select>
                        </div>
                        <Input label="Name" value={subscriber.name} onChange={(e) => setSubscriber({ ...subscriber, name: e.target.value })} />
                        <Input type="email" label="Email" value={subscriber.email} onChange={(e) => setSubscriber({ ...subscriber, email: e.target.value })} />
                        <Input type="password" label="Password" value={subscriber.password} onChange={(e) => setSubscriber({ ...subscriber, password: e.target.value })} />
                    </div>

                    {/* Address & Landmark */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Address" value={subscriber.address} onChange={(e) => setSubscriber({ ...subscriber, address: e.target.value })} />
                        <Input label="Landmark" value={subscriber.landmark} onChange={(e) => setSubscriber({ ...subscriber, landmark: e.target.value })} />
                    </div>

                    {/* Category, Plan, Contact, Contract */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                                Plan
                            </label>
                            <select
                                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                value={subscriber.plan}
                                onChange={(e) => setSubscriber({ ...subscriber, plan: e.target.value })}
                            >
                                <option value="">-- Select Plan --</option>
                                <option value="PLAN 888 (68MBPS)">PLAN 888 (68MBPS)</option>
                                <option value="PLAN 1 (200MBPS)">PLAN 1 (200MBPS)</option>
                                <option value="PLAN 2 (500MBPS)">PLAN 2 (500MBPS)</option>
                                <option value="PLAN 3 (800MBPS)">PLAN 3 (800MBPS)</option>
                            </select>
                        </div>

                        <Input label="Contact Number" value={subscriber.contactnumber} onChange={(e) => setSubscriber({ ...subscriber, contactnumber: e.target.value })} />
                        <Input label="Contract Number" value={subscriber.contractnumber} onChange={(e) => setSubscriber({ ...subscriber, contractnumber: e.target.value })} />
                    </div>

                    {/* NAP, Port, Fiber */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Input label="NAP Number" value={subscriber.napnumber} onChange={(e) => setSubscriber({ ...subscriber, napnumber: e.target.value })} />
                        <Input label="Port & Sequence" value={subscriber.portsequence} onChange={(e) => setSubscriber({ ...subscriber, portsequence: e.target.value })} />
                        <Input label="Fiber Meters" value={subscriber.meters} onChange={(e) => setSubscriber({ ...subscriber, meters: e.target.value })} />
                        <Input label="Created/Installed" value={subscriber.created_at} onChange={(e) => setSubscriber({ ...subscriber, created_at: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-1  gap-6">
                        <Input label="Remark" value={subscriber.remark} onChange={(e) => setSubscriber({ ...subscriber, remark: e.target.value })} />
                    </div>

                    {/* Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


const Input = ({ label, type = "text", value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="block w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
    </div>
)

export default EditSubscriber
