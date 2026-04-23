import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Users, Tv, Wifi, DollarSign } from "lucide-react";

// Dummy chart data
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4780 },
  { month: "May", revenue: 5890 },
  { month: "Jun", revenue: 6390 },
  { month: "Jul", revenue: 7490 },
  { month: "Aug", revenue: 8490 },
];


const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [subsCableInternetTotal, setsubsCableInternetTotal] = useState(0)
  const [subsCableOnlyTotal, setsubsCableOnlyTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    subscableinternetCount();
    subsCableOnlyCount();
    AdminRecords();
    fetchUsersGrowth();
    fetchUsersGrowthYearly();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }

  const subscableinternetCount = () => {
    axios.get('http://localhost:3000/auth/subscableinternet_count')
      .then(result => {
        if (result.data.Status) {
          setsubsCableInternetTotal(result.data.Result[0].subscriber)
        }
      })
  }

  const subsCableOnlyCount = () => {
    axios.get('http://localhost:3000/auth/subsCableOnly_count')
      .then(result => {
        if (result.data.Status && result.data.Result.length > 0) {
          setsubsCableOnlyTotal(result.data.Result[0].subscriber);
        } else {
          setsubsCableOnlyTotal(0); // default when no rows
        }
      })
      .catch(err => {
        console.error("Error fetching subsCableOnlyCount:", err);
        setsubsCableOnlyTotal(0);
      });
  }

  const [usersGrowthData, setUsersGrowthData] = useState([]);
  const fetchUsersGrowth = () => {
    axios.get("http://localhost:3000/auth/subscribers_growth")
      .then(result => {
        if (result.data.Status) {
          const data = result.data.Result.map(r => ({
            month: r.month,
            cable_only: Number(r.cable_only) || 0,
            cable_internet: Number(r.cable_internet) || 0,
          }));
          setUsersGrowthData(data);
        } else {
          setUsersGrowthData([]);
        }
      })
      .catch(err => {
        console.error("fetchUsersGrowth error:", err);
        setUsersGrowthData([]);
      });
  };


  const adminName = localStorage.getItem("adminName");

  // Dummy recent applications data
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Dummy application data
    const dummyData = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "Pending",
        created_at: "2025-09-06T10:30:00.000Z", // today
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Approved",
        created_at: "2025-09-06T10:30:00.000Z", // today
      },
      {
        id: 3,
        name: "Michael Johnson",
        email: "michael@example.com",
        status: "Rejected",
        created_at: "2025-09-01T10:30:00.000Z", // earlier this week
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        status: "Pending",
        created_at: "2025-08-28T14:15:00.000Z", // last month
      },
    ];

    // Filter only today's applications
    const today = new Date().toISOString().split("T")[0];
    const todayApps = dummyData.filter(app => {
      const appDate = new Date(app.created_at).toISOString().split("T")[0];
      return appDate === today;
    });

    setApplications(todayApps);
  }, []);


  const [usersGrowthYearlyData, setUsersGrowthYearlyData] = useState([]);
  const fetchUsersGrowthYearly = () => {
    axios.get("http://localhost:3000/auth/subscribers_growth_yearly")
      .then(result => {
        if (result.data.Status) {
          const allData = result.data.Result.map(r => ({
            year: r.year,
            cable_only: Number(r.cable_only) || 0,
            cable_internet: Number(r.cable_internet) || 0,
          }));

          // ✅ get the latest year dynamically
          const latestYear = Math.max(...allData.map(d => d.year));
          const latestYearData = allData.filter(d => d.year === latestYear);

          setUsersGrowthYearlyData(latestYearData);
        } else {
          setUsersGrowthYearlyData([]);
        }
      })
      .catch(err => {
        console.error("fetchUsersGrowthYearly error:", err);
        setUsersGrowthYearlyData([]);
      });
  };


  return (

    <div className="p-6 overflow-y-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-2xl font-semibold">Welcome Admin, {adminName ? adminName : "Admin"} 👋</h2>
        <p className="text-sm mt-2">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* <div className='p-3 d-flex justify-content-around mt-3'>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Admins</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total: </h5>
              <h5>{adminTotal}</h5>
            </div>
          </div>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Digital Cable & Internet</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{subsCableInternetTotal}</h5>
            </div>
          </div>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Subscriber with Cable Only</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{subsCableOnlyTotal}</h5>
            </div>
          </div>
        </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Admins */}
        <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Admins</h3>
            <Users size={28} className="text-indigo-500" />
          </div>
          <p className="text-3xl font-bold mt-3 text-gray-900">{adminTotal}</p>
        </div>

        {/* Digital Cable & Internet */}
        <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Cable & Internet</h3>
            <Wifi size={28} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-3 text-gray-900">{subsCableInternetTotal}</p>
        </div>

        {/* Digital Cable Only */}
        <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Cable Only</h3>
            <Tv size={28} className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold mt-3 text-gray-900">{subsCableOnlyTotal}</p>
        </div>

        {/* Revenue */}
        <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
            <DollarSign size={28} className="text-yellow-500" />
          </div>
          <p className="text-3xl font-bold mt-3 text-gray-900">$45,200</p>
        </div>
      </div>

      {/* 📊 Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Growth Line Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Users Growth Yearly Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Subscribers Growth ({usersGrowthYearlyData[0]?.year || "Latest Year"})
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersGrowthYearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cable_only" fill="#6366f1" name="Cable Only" radius={[10, 10, 0, 0]} />
              <Bar dataKey="cable_internet" fill="#10b981" name="Cable & Internet" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>


      </div>

      {/* RECENT APPLICATION */}
      <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase tracking-wider">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map(app => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{app.id}</td>
                    <td className="px-6 py-4">{app.name}</td>
                    <td className="px-6 py-4">{app.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${app.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            app.status === "Approved" ? "bg-green-100 text-green-800" :
                              "bg-red-100 text-red-800"}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No applications submitted today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADMIN SECTION*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin's Account */}
        <div className="bg-white rounded-2xl shadow p-6 col-span-2">
          <h3 className="text-lg font-semibold mb-4">Admin's Account</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-4 text-gray-600">Name</th>
                  <th className="py-2 px-4 text-gray-600">Email</th>
                  <th className="py-2 px-4 text-gray-600">Password</th>
                  <th className="py-2 px-4 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className="border-b">
                    <td className="py-2 px-4 text-gray-700">{a.name}</td>
                    <td className="py-2 px-4 text-gray-700">{a.email}</td>
                    <td className="py-2 px-4 text-gray-700">{a.password}</td>
                    <td>
                      <button className="btn btn-info btn-sm me-2">Edit</button>
                      <button className="btn btn-warning btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl h-[100%] shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              New version update available
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              3 new users joined today
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              Server load high
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home
