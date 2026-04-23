import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subscriber = () => {
  const [subscriber, setSubscriber] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [subscribersPerPage, setSubscribersPerPage] = useState(10); // 👈 dynamic page size
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/subscriber")
      .then((result) => {
        if (result.data.Status) {
          setSubscriber(result.data.Result);
        } else {
          toast.error(result.data.Error || "Failed to fetch subscribers");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong while fetching data");
      });
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subscriber?"
    );
    if (!confirmed) return;

    axios
      .delete("http://localhost:3000/auth/delete_subscriber/" + id)
      .then((result) => {
        if (result.data.Status) {
          toast.success("Subscriber deleted successfully");
          setSubscriber((prev) => prev.filter((sub) => sub.id !== id));
        } else {
          toast.error(result.data.Error || "Failed to delete subscriber");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error deleting subscriber");
      });
  };

  const handleViewSubscriber = (id) => {
    navigate(`/dashboard/view_subscriber/${id}`);
  };

  // 🔍 Filtered results
  const filteredSubscribers = subscriber.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.napnumber.toLowerCase().includes(search.toLowerCase()) ||
      e.address.toLowerCase().includes(search.toLowerCase()) ||
      e.plan.toLowerCase().includes(search.toLowerCase()) ||
      e.contractnumber.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLast = currentPage * subscribersPerPage;
  const indexOfFirst = indexOfLast - subscribersPerPage;
  const currentSubscribers = filteredSubscribers.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredSubscribers.length / subscribersPerPage);

  return (
    <div className="p-2 min-h-screen bg-gray-100 flex justify-center">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="w-[1560px] space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold text-gray-800">
            Subscriber List
          </h3>
          <Link
            to="/dashboard/add_subscriber"
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 text-decoration-none transition"
          >
            + Add Subscriber
          </Link>
        </div>

        {/* Search + Page Size */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="🔍 Search subscribers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to first page when searching
            }}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* 👇 Dropdown for page size */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Rows per page:</label>
            <select
              value={subscribersPerPage}
              onChange={(e) => {
                setSubscribersPerPage(Number(e.target.value));
                setCurrentPage(1); // reset page when changing size
              }}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="h-[1000px] overflow-y-auto rounded-2xl hide-scrollbar">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-indigo-600 text-white text-xs sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Address</th>
                  <th className="px-4 py-3 font-semibold">Landmark</th>
                  <th className="px-4 py-3 font-semibold">Plan</th>
                  <th className="px-4 py-3 font-semibold">Contact No.</th>
                  <th className="px-4 py-3 font-semibold">Contract No.</th>
                  <th className="px-4 py-3 font-semibold">Nap No.</th>
                  <th className="px-4 py-3 font-semibold">Port & Seq.</th>
                  <th className="px-4 py-3 font-semibold">Fiber Meters</th>
                  <th className="px-4 py-3 font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentSubscribers.map((e) => (
                  <tr
                    key={e.id}
                    className="hover:bg-gray-50 transition text-gray-700"
                  >
                    <td className="px-4 py-3 font-medium">{e.status}</td>
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3">{e.email}</td>
                    <td className="px-4 py-3">{e.address}</td>
                    <td className="px-4 py-3">{e.landmark}</td>
                    <td className="px-4 py-3">{e.plan}</td>
                    <td className="px-4 py-3">{e.contactnumber}</td>
                    <td className="px-4 py-3">{e.contractnumber}</td>
                    <td className="px-4 py-3">{e.napnumber}</td>
                    <td className="px-4 py-3">{e.portsequence}</td>
                    <td className="px-4 py-3">{e.meters}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewSubscriber(e.id)}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition"
                        >
                          View
                        </button>
                        <Link
                          to={`/dashboard/edit_subscriber/${e.id}`}
                          className="bg-green-600 text-white px-3 py-1.5 rounded text-xs hover:bg-green-700 text-decoration-none transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="bg-red-600 text-white px-3 py-1.5 rounded text-xs hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentSubscribers.length === 0 && (
                  <tr>
                    <td
                      colSpan="11"
                      className="px-4 py-10 text-center text-gray-500 italic"
                    >
                      🚫 No subscribers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📌 Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-3 py-1 rounded-md ${currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriber;
