import React, { useEffect, useState } from "react";
import axios from "axios";
import { Wrench, RefreshCcw, XCircle } from "lucide-react";

const Summary = () => {
  const [installs, setInstalls] = useState([]);
  const [reconnects, setReconnects] = useState([]);
  const [disconnects, setDisconnects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // 📌 Fetch data
  useEffect(() => {
    fetchSummary();
  }, [month, year]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/auth/monthly_summary", {
        params: { month, year },
      });

      if (res.data.Status) {
        const data = res.data.Result || [];
        setInstalls(data.filter((r) => r.type === "Install"));
        setReconnects(data.filter((r) => r.type === "Reconnect"));
        setDisconnects(data.filter((r) => r.type === "Disconnect"));
      }
    } catch (err) {
      console.error("Summary fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Reusable row renderer
  const renderRows = (data) =>
    data.map((item, index) => (
      <tr key={item.id}>
        <td className="p-2 border">{index + 1}</td>
        <td className="p-2 border">{item.name}</td>
        <td className="p-2 border">{item.address}</td>
        <td className="p-2 border">{item.plan}</td>
      </tr>
    ));

  // 📅 Dropdown options
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">📊 Service Summary</h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded-lg p-2 shadow-sm"
        >
          {months.map((m, i) => (
            <option key={i} value={i + 1}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-lg p-2 shadow-sm w-24"
        />

        <button
          onClick={fetchSummary}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Installs</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{installs.length}</p>
          </div>
          <Wrench className="text-indigo-500" size={40} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Reconnects</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{reconnects.length}</p>
          </div>
          <RefreshCcw className="text-green-500" size={40} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Disconnects</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{disconnects.length}</p>
          </div>
          <XCircle className="text-red-500" size={40} />
        </div>
      </div>

      {/* 📌 Tables */}
      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Install Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold text-indigo-600 mb-3">🛠️ Installs</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Plan</th>
                </tr>
              </thead>
              <tbody>
                {installs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-2 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
                ) : (
                  renderRows(installs)
                )}
              </tbody>
            </table>
          </div>

          {/* Reconnect Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold text-green-600 mb-3">🔄 Reconnects</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Plan</th>
                </tr>
              </thead>
              <tbody>
                {reconnects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-2 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
                ) : (
                  renderRows(reconnects)
                )}
              </tbody>
            </table>
          </div>

          {/* Disconnect Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold text-red-600 mb-3">❌ Disconnects</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Plan</th>
                </tr>
              </thead>
              <tbody>
                {disconnects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-2 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
                ) : (
                  renderRows(disconnects)
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
