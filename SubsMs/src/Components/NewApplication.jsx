import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

const NewApplication = () => {
  const [application, setApplication] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/application')
      .then(result => {
        if (result.data.Status) {
          setApplication(result.data.Result);
        } else {
          toast.error(result.data.Error || "Failed to fetch applications");
        }
      }).catch(err => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }, []);

  const handleDeleteApplication = (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    axios.delete(`http://localhost:3000/auth/delete_newapplication/${id}`)
      .then(result => {
        if (result.data.Status) {
          setApplication(prev => prev.filter(app => app.id !== id));
          toast.success("Application deleted successfully");
        } else {
          toast.error(result.data.Error || "Failed to delete application");
        }
      }).catch(() => {
        toast.error("Error deleting application");
      });
  };

  const handleViewApplication = async (id) => {
    try {
      // ✅ Tell backend this application has been seen
      await axios.put(`http://localhost:3000/auth/application/${id}/seen`);

      // ✅ Remove from current state so it disappears from the table.
      setApplication((prev) => prev.filter((app) => app.id !== id));

      // ✅ Navigate to application details page
      navigate(`/dashboard/application/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as seen");
    }
  };

  const handlePrintApplication = async (app) => {
    try {
      // Load fixed template from /public
      const response = await fetch("/ApplicationTemplateFixed.docx");
      const content = await response.arrayBuffer();

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: "[[", end: "]]" }, // use safe delimiters
      });

      // Render with the selected application's data
      doc.render(app);

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, `application_${app.firstname}_${app.surname}.docx`);
      toast.success("Application exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to print application");
    }
  };

  return (
    <div className="min-h-screen w-[1600px] px-2 sm:px-4 py-4 overflow-y-auto">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-800">
          New Applications
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
          + Add New
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
          <thead className="bg-blue-800 text-white uppercase text-xs md:text-sm">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Surname</th>
              <th className="px-4 py-3">F. Name</th>
              <th className="px-4 py-3">M. Name</th>
              <th className="px-4 py-3">Birthday</th>
              <th className="px-4 py-3">P. of Birth</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Civil Status</th>
              <th className="px-4 py-3">Mother's Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Billing Address</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Home Number</th>
              <th className="px-4 py-3">Mobile Number</th>
              <th className="px-4 py-3">Landmark</th>
              <th className="px-4 py-3">Employer Name</th>
              <th className="px-4 py-3">Employer Address</th>
              <th className="px-4 py-3">Employer Number</th>
              <th className="px-4 py-3">Occupation</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {application.map(a => (
              <tr key={a.id} className="hover:bg-gray-100 transition">
                <td className="px-2 py-3">{a.category}</td>
                <td className="px-2 py-3">{a.surname}</td>
                <td className="px-2 py-3">{a.firstname}</td>
                <td className="px-2 py-3">{a.middlename}</td>
                <td className="px-2 py-3">{a.dateofbirth}</td>
                <td className="px-2 py-3">{a.placeofbirth}</td>
                <td className="px-2 py-3">{a.gender}</td>
                <td className="px-2 py-3">{a.civilstatus}</td>
                <td className="px-2 py-3">{a.mothermaidenname}</td>
                <td className="px-2 py-3">{a.email}</td>
                <td className="px-2 py-3">{a.billingadd}</td>
                <td className="px-2 py-3">{a.address}</td>
                <td className="px-2 py-3">{a.homenumber}</td>
                <td className="px-2 py-3">{a.mobilenumber}</td>
                <td className="px-2 py-3">{a.landmark}</td>
                <td className="px-2 py-3">{a.employername}</td>
                <td className="px-2 py-3">{a.employeraddress}</td>
                <td className="px-2 py-3">{a.officenumber}</td>
                <td className="px-2 py-3">{a.occupation}</td>
                <td className="px-2 py-3 text-center flex justify-center gap-2 flex-wrap">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition"
                    onClick={() => handleViewApplication(a.id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md text-xs hover:bg-indigo-700 transition"
                    onClick={() => handlePrintApplication(a)}
                  >
                    Print
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700 transition"
                    onClick={() => handleDeleteApplication(a.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewApplication;
