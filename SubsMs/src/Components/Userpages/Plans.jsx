// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";

// import Plan888 from "../../assets/PLAN888.jpg";
// import Plan1 from "../../assets/PLAN1.jpg";
// import Plan2 from "../../assets/PLAN2.jpg";
// import Plan3 from "../../assets/PLAN3.png";

// const Plans = () => {
//   const [lat, setLat] = useState(null);
//   const [lon, setLon] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLat(pos.coords.latitude);
//         setLon(pos.coords.longitude);
//       },
//       (err) => {
//         console.error("Location access denied or unavailable.", err);
//       }
//     );
//   }, []);

//   return (

//     <div className="bg-gray-50 text-center">
//       <div className="bg-blue-800 pb-1.5" />
//       <p className="text-6xl font-bold text-em pt-3 mb-2">CABLE<span className="text-blue-700">VISION</span></p>
//       <p className="text-xl font-semibold text-gray-800 mb-2">
//         Choose the right plan for you
//       </p>
//       <p className="text-gray-600 max-w-2xl mx-auto mb-8 pb-10">
//         Stay connected with fast, unlimited fiber plans built for every household. <br />
//         –streaming, gaming, working from home, and more.
//       </p>

//       <div className='flex flex-wrap justify-center'>
//         <Link to='/plan550' className="bg-white w-[320px] h-[400px] rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 duration-500 overflow-hidden text-decoration-none">
//           <img src={Plan888} alt="Basic Package" className="w-full h-[240px] object-cover " />
//           <div className="p-3 text-blue-900">
//             <h3 className="font-bold text-base">BF Plan 550</h3>
//             <p className="text-xs text-gray-600 mt-1">Unli fiber for smooth streaming and browsing.</p>
//             <button className="mt-3 text-white bg-orange-700 hover:bg-orange-800 px-3 py-1.5 text-xs rounded">LEARN MORE</button>
//           </div>
//         </Link>
//       </div>

//       <div className="flex flex-wrap justify-center gap-15 px-4 sm:px-6 md:px-10 lg:px-16 py-12 mx-auto max-w-auto mb-10">
//         <Link to='/plan888' className="bg-white w-[320px] h-[400px] rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 duration-500 overflow-hidden text-decoration-none">
//           <img src={Plan888} alt="Basic Package" className="w-full h-[240px] object-cover " />
//           <div className="p-3 text-blue-900">
//             <h3 className="font-bold text-base">PLAN 888</h3>
//             <p className="text-xs text-gray-600 mt-1">Unli fiber for smooth streaming and browsing.</p>
//             <button className="mt-3 text-white bg-orange-700 hover:bg-orange-800 px-3 py-1.5 text-xs rounded">LEARN MORE</button>
//           </div>
//         </Link>

//         <Link to="/plan1" className="bg-white w-[320px] h-[400px] rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 duration-500 overflow-hidden text-decoration-none">
//           <img src={Plan1} alt="Standard Package" className="w-full h-[240px] object-cover" />
//           <div className="p-3 text-blue-900">
//             <h3 className="font-bold text-base">PLAN 1</h3>
//             <p className="text-xs text-gray-600 mt-1">Unli fiber for smooth streaming and browsing.</p>
//             <button className="mt-3 text-white bg-orange-700 hover:bg-orange-800 px-3 py-1.5 text-xs rounded">LEARN MORE</button>
//           </div>
//         </Link>

//         <Link to="/plan2" className="bg-white w-[320px] h-[400px]] rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 duration-500 overflow-hidden text-decoration-none">
//           <img src={Plan2} alt="Premium Package" className="w-full h-[240px] object-cover" />
//           <div className="p-3 text-blue-900">
//             <h3 className="font-bold text-base">PLAN 2</h3>
//             <p className="text-xs text-gray-600 mt-1">Unli fiber for smooth streaming and browsing.</p>
//             <button className="mt-3 text-white bg-orange-700 hover:bg-orange-800 px-3 py-1.5 text-xs rounded">LEARN MORE</button>
//           </div>
//         </Link>

//         <Link to="/plan3" className="bg-white w-[320px] h-[400px] rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 duration-500 overflow-hidden text-decoration-none">
//           <img src={Plan3} alt="Ultimate Package" className="w-full h-[240px] object-cover object-center" />
//           <div className="p-3 text-blue-900">
//             <h3 className="font-bold text-base">PLAN 3</h3>
//             <p className="text-xs text-gray-600 mt-1">Unli fiber for smooth streaming and browsing.</p>
//             <button className="mt-3 text-white bg-orange-700 hover:bg-orange-800 px-3 py-1.5 text-xs rounded">LEARN MORE</button>
//           </div>
//         </Link>
//       </div>


//       <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//           {/* Left Side */}
//           <div className="order-2 lg:order-2 text-center lg:text-left px-4">
//             <p className="text-7xl font-bold text-blue-900 leading-tight">
//               NEED HELP <br /> DECIDING?
//             </p>
//             <p className="text-gray-700 mt-4 text-lg">
//               Fill out this form and we’ll help you decide.
//             </p>
//             <p className="mt-6 text-blue-600 text-sm">
//               Or click here for{" "}
//               <Link
//                 to="/applynow"
//                 className="font-bold underline hover:text-blue-800 transition"
//               >
//                 self-service application
//               </Link>.
//             </p>
//           </div>

//           {/* Right Side: Form Card */}
//           <div className="order-1 lg:order-1 w-full bg-white p-8 rounded-3xl shadow-2xl">
//             <p className="text-5xl font-bold text-blue-900">SITE INSPECTION</p>
//             <p className="text-lg font-semibold">
//               “Slots are filling up fast! Check now if fiber is available in your area—secure yours today!”
//             </p>

//             <form className="space-y-4">
//               <input type="text" placeholder="Full Name" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
//               <input type="text" placeholder="Mobile Number" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
//               <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
//               <input type="text" placeholder="Full Address" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
//               <input type="text" placeholder="Landmark" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />

//               <select className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none">
//                 <option value="">Select your preferred plan</option>
//                 <option value="BF Plan 550">BF Plan 550</option>
//                 <option value="Plan 888">Plan 888</option>
//                 <option value="Plan 1">Plan 1</option>
//                 <option value="Plan 2">Plan 2</option>
//                 <option value="Plan 3">Plan 3</option>
//               </select>

//               <label className="block text-sm text-gray-700 mt-2">
//                 Preferred Installation Time
//               </label>
//               <input type="date" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />

//               <input type="text" placeholder="Enter Promo Code (if any)" className="w-full px-4 py-2 bg-gray-100 rounded-md" />

//               {/* Auto Location Map */}
//               <label className="block text-sm font-medium text-gray-700 mt-4">
//                 Share Your Location
//               </label>
//               <div className="w-full h-64 rounded-md overflow-hidden shadow-md">
//                 {lat && lon ? (
//                   <iframe
//                     title="google-map"
//                     className="w-full h-full"
//                     loading="lazy"
//                     allowFullScreen
//                     src={`https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`}
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-500">
//                     Getting your location...
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="mt-4 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold w-full"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default Plans;

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Plan888Img from "../../assets/PLAN888.jpg";
import Plan1Img from "../../assets/PLAN1.jpg";
import Plan2Img from "../../assets/PLAN2.jpg";
import Plan3Img from "../../assets/PLAN3.png";

// 1. Data array to keep things organized
const PLAN_DATA = [
  { id: '550', name: 'BF Plan 550', img: Plan888Img, path: '/plan550', alt: 'Budget Friendly Package', price: '550.00', saying: 'Unli fiber for smooth streaming and browsing.' },
  { id: '888', name: 'PLAN 888', img: Plan888Img, path: '/plan888', alt: 'Basic Package', price: '800.00', saying: 'Unli fiber for smooth streaming and browsing.' },
  { id: '1', name: 'PLAN 1', img: Plan1Img, path: '/plan1', alt: 'Standard Package', price: '1260.00', saying: 'Unli fiber for smooth streaming and browsing.' },
  { id: '2', name: 'PLAN 2', img: Plan2Img, path: '/plan2', alt: 'Premium Package', price: '1600.00', saying: 'Unli fiber for smooth streaming and browsing.' },
  { id: '3', name: 'PLAN 3', img: Plan3Img, path: '/plan3', alt: 'Ultimate Package', price: '2100.00', saying: 'Unli fiber for smooth streaming and browsing.' },
];

// 2. Reusable Card Component
const PlanCard = ({ plan }) => (
  <Link to={plan.path} className="bg-white w-[320px] h-[400px] rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 duration-500 overflow-hidden text-decoration-none">
    <img src={plan.img} alt={plan.alt} className="w-full h-[240px] object-cover" />
    <div className="p-3 text-blue-900">
      <h3 className="font-bold text-base">{plan.name}</h3>
      <p className="text-xs text-gray-600 mt-1">{plan.saying}</p>
      <button className="mt-3 text-white bg-orange-700 hover:bg-orange-800 px-3 py-1.5 text-xs rounded">LEARN MORE</button>
    </div>
  </Link>
);

const Plans = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.error("Location access denied.", err)
    );
  }, []);

  return (
    <div className="bg-gray-50 text-center">
      <div className="bg-blue-800 pb-1.5" />

      {/* Header Section */}
      <header className="pt-8 mb-8">
        <p className="text-6xl font-bold mb-2 text-blue-900">CABLE<span className="text-blue-700">VISION</span></p>
        <p className="text-xl font-semibold text-gray-800 mb-2">Choose the right plan for you</p>
        <button
          onClick={() => setIsCompareOpen(true)}
          className="mt-4 bg-white border-2 border-blue-900 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-blue-900 hover:text-white transition duration-300"
        >
          Compare All Plans
        </button>
      </header>

      {/* Plans Grid */}
      <div className="flex flex-wrap justify-center gap-10 px-4 py-12 max-w-7xl mx-auto">
        {PLAN_DATA.map(plan => <PlanCard key={plan.id} plan={plan} />)}
      </div>

      {/* Comparison Modal */}
      {/* {isCompareOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6 text-blue-900">
              <h2 className="text-3xl font-bold">Plan Comparison</h2>
              <button onClick={() => setIsCompareOpen(false)} className="text-gray-500 hover:text-red-500 text-3xl">&times;</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 font-bold text-gray-600">Feature</th>
                    {PLAN_DATA.map(p => <th key={p.id} className="py-4 px-2 text-center text-blue-800">{p.name}</th>)}
                  </tr>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 font-bold text-gray-600">PRICE</th>
                    {PLAN_DATA.map(p => <th key={p.id} className="py-4 px-2 text-center text-red-500">{"\u20B1"} {p.price}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 font-semibold text-gray-700">Description</td>
                    {PLAN_DATA.map(p => <td key={p.id} className="py-4 px-2 text-center text-xs text-gray-500">{p.alt}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )} */}

      {isCompareOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-50 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white">
              <div>
                <h2 className="text-2xl font-black text-blue-900">Compare Plans</h2>
                <p className="text-sm text-gray-500">Find the perfect fit for your needs</p>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLAN_DATA.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col hover:border-blue-500 transition-colors shadow-sm"
                  >
                    {/* Plan Badge/Name */}
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                      Plan Level
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>

                    {/* Price */}
                    <div className="my-4">
                      <span className="text-3xl font-black text-red-500">
                        {"\u20B1"} {p.price}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">/ month</span>
                    </div>

                    <hr className="my-4 border-gray-100" />

                    {/* Description Section */}
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-gray-700 mb-2 uppercase text-[10px] tracking-tight">
                        Description
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed italic">
                        "{p.alt}"
                      </p>
                    </div>

                    {/* Action Button (Optional) */}
                    <button className="mt-6 w-full py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-transform active:scale-95">
                      Choose {p.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Site Inspection Section */}
      <section className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="text-center lg:text-left px-4">
            <h2 className="text-7xl font-bold text-blue-900 leading-tight">NEED HELP <br /> DECIDING?</h2>
            <p className="text-gray-700 mt-4 text-lg">Fill out this form and we’ll help you decide.</p>
            {/* Restored Self-Service Link */}
            <p className="mt-6 text-blue-600 text-sm">
              Or click here for <Link to="/applynow" className="font-bold underline hover:text-blue-800 text-decoration-none">self-service application</Link>.
            </p>
          </div>

          <div className="w-full bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-5xl font-bold text-blue-900 mb-4">SITE INSPECTION</h2>
            <p className="text-lg font-semibold mb-6">“Slots are filling up fast! Check now if fiber is available in your area!”</p>

            <form className="space-y-4 text-left">
              {['Full Name', 'Mobile Number', 'Email', 'Full Address', 'Landmark'].map(field => (
                <input
                  key={field}
                  type={field === 'Email' ? 'email' : 'text'}
                  placeholder={field}
                  className="w-full px-4 py-2 bg-gray-100 rounded-md mb-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}

              <select className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none">
                <option value="">Select your preferred plan</option>
                {PLAN_DATA.map(plan => <option key={plan.id} value={plan.name}>{plan.name}</option>)}
              </select>

              <div>
                <label className="text-sm text-gray-700">Preferred Installation Time</label>
                <input type="date" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none" />
              </div>

              <input type="text" placeholder="Enter Promo Code (if any)" className="w-full px-4 py-2 bg-gray-100 rounded-md" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Share Your Location</label>
                <div className="w-full h-64 rounded-md overflow-hidden shadow-md bg-gray-200">
                  {coords.lat ? (
                    <iframe
                      title="google-map"
                      className="w-full h-full border-0"
                      src={`https://maps.google.com/maps?q=${coords.lat},${coords.lon}&z=15&output=embed`}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 italic">Getting location...</div>
                  )}
                </div>
              </div>

              <button type="submit" className="mt-4 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold w-full transition duration-300">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;