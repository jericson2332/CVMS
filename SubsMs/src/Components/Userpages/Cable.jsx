import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Cable = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      },
      (err) => {
        console.error("Location access denied or unavailable.", err);
      }
    );
  }, []);

  return (
    <div className="bg-gray-50 text-center">
      <div className="bg-blue-800 pb-1.5" />
      <h2 className="text-4xl font-bold text-em pt-3 mb-2">CABLE<span className="text-blue-700">VISION</span></h2>
      <p className="text-lg font-semibold text-gray-800 mb-2">
        Connections that bring out the best in everyone.
      </p>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 pb-10">
        Stay connected with fast, unlimited fiber plans built for every household. <br />
        –streaming, gaming, working from home, and more.
      </p>

      <div className="flex justify-center items-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 duration-500 overflow-hidden w-full max-w-sm">
          <Link to="/digitalcableonly" className="text-decoration-none block">
            <img
              src=""
              alt="DIGITAL CABLE ONLY"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-blue-900">
              <h3 className="font-bold text-lg">DIGITAL CABLE ONLY</h3>
              <p className="text-sm text-gray-600 mt-1">
                Unli fiber for smooth streaming and browsing.
              </p>
              <button className="mt-4 text-white bg-orange-700 hover:bg-orange-800 px-4 py-2 text-sm rounded">
                LEARN MORE
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="text-center lg:text-left px-4">
            <h1 className="text-5xl font-bold text-purple-800 leading-tight">
              NEED HELP <br /> DECIDING?
            </h1>
            <p className="text-gray-700 mt-4 text-lg">
              Fill out this form and we’ll help you decide.
            </p>
            <p className="mt-6 text-blue-600 text-sm">
              Or click here for{" "}
              <Link
                to="/applynow"
                className="font-bold underline hover:text-blue-800 transition"
              >
                self-service application
              </Link>.
            </p>
          </div>

          {/* Right Side: Form Card */}
          <div className="w-full bg-white p-8 rounded-3xl shadow-2xl">
            <h1>DIGITAL CABLE ONLY</h1>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="text" placeholder="Mobile Number" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="text" placeholder="Full Address" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="text" placeholder="LandMark" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />

              <select className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none">
                <option value="Select Plan" >Select your preferred plan</option>
                <option value="DIGITAL CABLE ONLY">DIGITAL CABLE ONLY</option>
              </select>

              <label className="block text-sm text-gray-700 mt-2">Preferred Installation Time</label>
              <input type="date" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="text" placeholder="Enter Promo Code (if any)" className="w-full px-4 py-2 bg-gray-100 rounded-md" />

              {/* Auto Location Map */}
              <label className="block text-sm font-medium text-gray-700 mt-4">Share Your Location</label>
              <div className="w-full h-64 rounded-md overflow-hidden shadow-md">
                {lat && lon ? (
                  <iframe
                    title="google-map"
                    className="w-full h-full"
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`}
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Getting your location...
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cable;
