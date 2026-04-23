import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; //  Location icon
import bannerImage from "../../assets/residential-banner.png"; //  Banner image
import axios from "axios";

const ApplyNow = () => {

  //  Simple PDF download
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/ApplicationTemplate.pdf"; // this will now work
    link.download = "ApplicationTemplate.pdf"; // remove the leading "/"
    link.click();
  };
  // END Simple PDF download

  // NEW APLLICATION 
  const [newapplication, setNewapplication] = useState({
    category: '',
    surname: '',
    firstname: '',
    middlename: '',
    dateofbirth: '',
    placeofbirth: '',
    gender: '',
    civilstatus: '',
    mothermaidenname: '',
    email: '',
    billingadd: '',
    address: '',
    landmark: '',
    homenumber: '',
    mobilenumber: '',
    employername: '',
    employeraddress: '',
    officenumber: '',
    occupation: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!newapplication.category || !newapplication.surname || !newapplication.firstname || !newapplication.middlename ||
      !newapplication.dateofbirth || !newapplication.placeofbirth || !newapplication.gender ||
      !newapplication.civilstatus || !newapplication.mothermaidenname || !newapplication.email || !newapplication.billingadd ||
      !newapplication.address || !newapplication.landmark || !newapplication.homenumber || !newapplication.mobilenumber ||
      !newapplication.employername || !newapplication.employeraddress || !newapplication.officenumber ||
      !newapplication.occupation) {
      alert("Please fill out all required fields.");
      return;
    }

    axios.post('http://localhost:3000/auth/new_application', newapplication)
      .then(result => {
        if (result.data.Status) {
          alert('✅ Subscriber added successfully!');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };
  // END OF NEW APPLICATION


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-blue-800 pb-1.5" />

      {/*  Banner Section */}
      <div
        className="w-full h-[580px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
      <div className="absolute w-full h-full bg-black/60 z-0"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold">SELF APPLICATION</h1>
          <p className="text-md md:text-lg mt-2">
            Please download and fill out all the required fields.
          </p>

          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-8 py-4 rounded text-lg font-semibold hover:bg-blue-700 transition mt-6"
          >
            Download Application Form
          </button>
        </div>
      </div>

      {/*  Offices Section */}
      <div><p className="text-6xl text-center text-blue-900 font-bold px-6 py-12">Check your nearest Office</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12 max-w-[1500px] mx-auto">
        {/* Main Office Code*/}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col 
                          justify-between border hover:shadow-2xl hover:scale-105 transition-transform h-[350px]">
          <p className="text-3xl font-bold text-gray-800 mb-3">Main Office</p>
          <p className="text-lg text-gray-600 mb-4 flex flex-col items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-red-500 text-4xl" />
            Sitio Maligaya Brgy. Pagsawitan, Santa Cruz, Laguna
          </p>
          <button
            onClick={() => window.open("https://maps.app.goo.gl/5rkvRaH1dGpAJHCy7", "_blank")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-auto"
          >
            <FaMapMarkerAlt /> View Location
          </button>
        </div>

        {/* SCL Extension Office */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-between border hover:shadow-2xl hover:scale-105 transition-transform h-[350px]">
          <p className="text-3xl font-bold text-gray-800 mb-3">SCL Extension Office</p>
          <p className="text-lg text-gray-600 mb-4 flex flex-col items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-red-500 text-4xl" />
            1683 L.Taleon St, Santa Cruz, Laguna
          </p>
          <button
            onClick={() => window.open("https://maps.app.goo.gl/zjR28zPCxUAwLvHM7", "_blank")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-auto"
          >
            <FaMapMarkerAlt /> View Location
          </button>
        </div>

        {/* Pila Extension Office */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-between border hover:shadow-2xl hover:scale-105 transition-transform h-[350px]">
          <p className="text-3xl font-bold text-gray-800 mb-3">Pila Extension Office</p>
          <p className="text-lg text-gray-600 mb-4 flex flex-col items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-red-500 text-4xl" />
            In front of 7/11 Brgy. Labuin, Pila, Laguna
          </p>
          <button
            onClick={() => window.open("https://maps.app.goo.gl/dBnQrrnY4h8nDhug6", "_blank")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-auto"
          >
            <FaMapMarkerAlt /> View Location
          </button>
        </div>

        {/* Magdalena Extension Office */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-between border hover:shadow-2xl hover:scale-105 transition-transform h-[350px]">
          <p className="text-3xl font-bold text-gray-800 mb-3">Magdalena Extension Office</p>
          <p className="text-lg text-gray-600 mb-4 flex flex-col items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-red-500 text-4xl" />
            Beside Palawan Express Tolentino St., Magdalena, Laguna
          </p>
          <button
            onClick={() => window.open("https://maps.app.goo.gl/euo312RbJ6Xx9NHC9", "_blank")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-auto"
          >
            <FaMapMarkerAlt /> View Location
          </button>
        </div>
      </div>

      {/** FORM */}
      <div className="bg-gray-100">
        <div>
          <p className="text-6xl text-center text-blue-700 font-bold pt-5">APPLICATION FORM</p>
        </div>
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 my-10">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <h1 className="text-2xl font-bold text-center mb-6">
              Cable Television Service Application Form
            </h1>
            <p className="text-center text-gray-500 mb-10">
              Please fill out all required fields (*)
            </p>

            {/* CATEGORY*/}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <select
                  className={inputStyle}
                  required
                  value={newapplication.category}
                  onChange={(e) =>
                    setNewapplication({ ...newapplication, category: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Choose your Category
                  </option>
                  <option value="Cable & Internet (Plan 888 Up to 68 MBPS)">Cable & Internet (Plan 888 Up to 68 MBPS)</option>
                  <option value="Cable & Internet (Plan 1 Up to 200 MBPS)">Cable & Internet (Plan 1 Up to 200 MBPS)</option>
                  <option value="Cable & Internet (Plan 2 Up to 500 MBPS)">Cable & Internet (Plan 2 Up to 500 MBPS)</option>
                  <option value="Cable & Internet (Plan 3 Up to 800 MBPS)">Cable & Internet (Plan 3 Up to 800 MBPS)</option>
                  <option value="Digital Cable Only">Digital Cable Only</option>
                </select>
              </div>
            </section>

            {/* Personal Information */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surname *</label>
                  <input
                    type="text"
                    className={inputStyle}
                    required
                    onChange={(e) => setNewapplication({ ...newapplication, surname: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    className={inputStyle}
                    required
                    onChange={(e) => setNewapplication({ ...newapplication, firstname: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name *</label>
                  <input
                    type="text"
                    className={inputStyle}
                    required
                    onChange={(e) => setNewapplication({ ...newapplication, middlename: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    className={inputStyle}
                    required
                    onChange={(e) => setNewapplication({ ...newapplication, dateofbirth: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth *</label>
                  <input
                    type="text"
                    className={inputStyle}
                    required
                    onChange={(e) => setNewapplication({ ...newapplication, placeofbirth: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select className={inputStyle} required
                    onChange={(e) => setNewapplication({ ...newapplication, gender: e.target.value })}>
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status *</label>
                  <select className={inputStyle} required
                    onChange={(e) => setNewapplication({ ...newapplication, civilstatus: e.target.value })}>
                    <option value="">Civil Status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Maiden Name *</label>
                  <input type="text" className={inputStyle} required
                    onChange={(e) => setNewapplication({ ...newapplication, mothermaidenname: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className={inputStyle}
                    required
                    onChange={(e) =>
                      setNewapplication({ ...newapplication, email: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Home Ownership Section */}
            {/* <section className="mb-10">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Home Ownership</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <label className="flex items-center">
                  <input type="checkbox" name="homeownership" value="Rented" />
                  Rented
                </label>

                <label className="flex items-center gap-4">
                  <input type="checkbox" name="homeownership" value="Owned" />
                  Owned
                </label>

                <label className="flex items-center gap-4">
                  <input type="checkbox" name="homeownership" value="Living with relatives/parents" />
                  Living with relatives/parents
                </label>
              </div>
            </section> */}

            {/* Address Information */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-4 border-b">Address Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Billing Address" className={inputStyle} required
                  onChange={(e) => setNewapplication({ ...newapplication, billingadd: e.target.value })} />
                <input type="text" placeholder="Residential Address" className={inputStyle} required
                  onChange={(e) => setNewapplication({ ...newapplication, address: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <input
                  type="text"
                  placeholder="Home Phone"
                  className={inputStyle}
                  required
                  onChange={(e) =>
                    setNewapplication({ ...newapplication, homenumber: e.target.value })} />
                <input
                  type="text"
                  placeholder="Mobile Phone"
                  className={inputStyle}
                  required
                  onChange={(e) =>
                    setNewapplication({ ...newapplication, mobilenumber: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 gap-6 mt-4">
                <input
                  type="text"
                  placeholder="Landmark"
                  className={inputStyle}
                  required
                  onChange={(e) =>
                    setNewapplication({ ...newapplication, landmark: e.target.value })
                  }
                />
              </div>
            </section>

            {/* Employment Details */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Employment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Employer Name" className={inputStyle} required
                  onChange={(e) => setNewapplication({ ...newapplication, employername: e.target.value })} />
                <input type="text" placeholder="Employer Address" className={inputStyle} required
                  onChange={(e) => setNewapplication({ ...newapplication, employeraddress: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <input type="text" placeholder="Office Phone" className={inputStyle} required
                  onChange={(e) => setNewapplication({ ...newapplication, officenumber: e.target.value })} />
                <input type="text" placeholder="Occupation" className={inputStyle} required
                  onChange={(e) => setNewapplication({ ...newapplication, occupation: e.target.value })} />
              </div>
            </section>

            {/* Buttons */}
            <div className="flex justify-end gap-4">

              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// KUNG GUSTO KO LANG NG MAY IBANG PANG DESIGN, LAGYAN NG CURL BRACKET {inputStyle}
const inputStyle = `
block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900
shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
`;

export default ApplyNow;
