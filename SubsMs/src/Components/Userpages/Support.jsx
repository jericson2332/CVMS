// import React, { useState } from "react";
// import supportbanner from "../../assets/support-banner2.png";
// import { Link } from "react-router-dom";

// import support1 from "../../assets/new-install-less.jpg";
// import support2 from "../../assets/reconnect.jpg";

// const Support = () => {
//   const [filter, setFilter] = useState("");


//   return (
//     <>
//       {/* Banner */}
//       <div
//         className="w-full h-[600px] bg-cover bg-center relative flex items-center justify-center"
//         style={{ backgroundImage: `url(${supportbanner})` }}
//       >
//         <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>
//         <div className="relative z-10 text-center text-white px-4">
//           <h1 className="text-4xl font-bold"></h1>
//           <p className="text-md md:text-lg mt-2"></p>
//         </div>
//       </div>

//       {/* Deals Section */}
//       <section className="max-w-7xl mx-auto px-4 py-10">
//         <h2 className="text-center text-3xl font-extrabold mb-6">
//           Here are the top deals that we prepared just for you.
//         </h2>

//         {/* Filter Buttons */}
//         <div className="flex justify-center gap-3 mb-8">

//           <Link to="/faq"
//             className="px-4 py-2 rounded-full text-sm font-semibold text-black bg-gray-200 text-decoration-none"
//           >
//             FAQS & QUESTIONS
//           </Link>


//           <button
//             className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === "new" ? "bg-black text-white" : "bg-gray-200"
//               }`}
//             onClick={() => setFilter("new")}
//           >
//             NEW SUBSCRIBERS
//           </button>
//           <button
//             className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === "existing" ? "bg-black text-white" : "bg-gray-200"
//               }`}
//             onClick={() => setFilter("existing")}
//           >
//             EXISTING SUBSCRIBERS
//           </button>
//         </div>

//         {/* Deals Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {/* BUTTON 2 */}
//           {(filter === "" || filter === "new") && (
//             <div className="flex flex-col items-center">
//               <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative w-full">
//                 <img
//                   src={support1}
//                   alt="Fiber Sale"
//                   className="w-full h-48 object-cover"
//                 />
//               </div>
//               <div className="text-center mt-3">
//                 <h3 className="text-red-600 text-lg font-semibold">Fiber Sale</h3>
//                 <p className="text-gray-600 text-sm mt-1">
//                   Save ₱3,600 with free installation. Exclusive to Online and
//                   Retail applications.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* BUTTON 3 */}
//           {(filter === "" || filter === "existing") && (
//             <div className="flex flex-col items-center">
//               <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative w-full">
//                 <div className="absolute top-3 right-3 bg-gradient-to-r  from-blue-500 to-blue-900 text-white rounded-xl px-3 py-1 text-xs font-bold text-center mt-2">
//                   <div>SAVE ₱3600</div>
//                   <div>FREE INSTALLATION</div>
//                 </div>
//                 <img
//                   src={support2}
//                   alt="Get 50% off your monthly service fee"
//                   className="w-full h-48 object-cover"
//                 />
//               </div>
//               <div className="text-center mt-3">
//                 <h3 className="text-red-600 text-lg font-semibold">
//                   Get 50% off your monthly service fee
//                 </h3>
//                 <p className="text-gray-600 text-sm mt-1">
//                   for 6 months or free speedboost for 1 year when you switch!
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//     </>
//   );
// };

// export default Support;

import React, { useState } from "react";
import supportbanner from "../../assets/support-banner2.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import support1 from "../../assets/new-install-less.jpg";
import support2 from "../../assets/reconnect.jpg";

const Support = () => {
  const [filter, setFilter] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const allDeals = [
    {
      id: 1,
      category: "new",
      title: "Fiber Sale",
      desc: "Save ₱3,600 with free installation. Exclusive to Online and Retail applications.",
      img: support1,
      tag: "BEST SELLER",
      btn: "Claim Offer"
    },
    {
      id: 2,
      category: "existing",
      title: "Switch & Save 50%",
      desc: "Get 50% off for 6 months or free speedboost for 1 year when you switch today!",
      img: support2,
      tag: "SWITCH PROMO",
      btn: "Switch Now"
    },
    {
      id: 3,
      category: "new",
      title: "Student Power Pack",
      desc: "Get a dedicated study-speed boost from 7 AM to 5 PM. Stay ahead in your classes.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      tag: "STUDENT SPECIAL",
      btn: "Learn More"
    },
    {
      id: 4,
      category: "existing",
      title: "Refer-A-Friend",
      desc: "Refer a neighbor and get 1 month of internet absolutely FREE for both of you!",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      tag: "COMMUNITY REWARD",
      btn: "Refer Now"
    },
    {
      id: 5,
      category: "new",
      title: "Gaming Tier Elite",
      desc: "Zero-latency priority routing and a premium Wi-Fi 6 router included in your setup.",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      tag: "GAMER FOCUS",
      btn: "Level Up"
    },
    {
      id: 6,
      category: "existing",
      title: "Business Continuity",
      desc: "Upgrade to a static IP and 24/7 dedicated corporate support at 30% off for 12 months.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      tag: "BUSINESS GRADE",
      btn: "Upgrade Now"
    }
  ];

  const filteredDeals = filter === "" ? allDeals : allDeals.filter(deal => deal.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner Section */}
      <div
        className="w-full h-[600px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${supportbanner})` }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
          >
            SUPPORT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl mt-4 font-bold tracking-widest text-teal-400 uppercase"
          >
            Empowering Your Connection
          </motion.p>
        </div>
      </div>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6 uppercase">Exclusive Offers & Promos</h2>
          <div className="w-24 h-2 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link to="/faq" className="px-8 py-3 rounded-full text-xs font-black text-white bg-blue-900 hover:bg-teal-600 transition-all shadow-xl uppercase tracking-widest">
            FAQs & HELP
          </Link>
          <button
            className={`px-8 py-3 rounded-full text-xs font-black transition-all shadow-xl uppercase tracking-widest ${filter === "" ? "bg-teal-600 text-white" : "bg-white text-blue-900"}`}
            onClick={() => setFilter("")}
          >
            ALL DEALS
          </button>
          <button
            className={`px-8 py-3 rounded-full text-xs font-black transition-all shadow-xl uppercase tracking-widest ${filter === "new" ? "bg-teal-600 text-white" : "bg-white text-blue-900"}`}
            onClick={() => setFilter("new")}
          >
            NEW SUBSCRIBERS
          </button>
          <button
            className={`px-8 py-3 rounded-full text-xs font-black transition-all shadow-xl uppercase tracking-widest ${filter === "existing" ? "bg-teal-600 text-white" : "bg-white text-blue-900"}`}
            onClick={() => setFilter("existing")}
          >
            EXISTING USERS
          </button>
        </div>

        {/* Deals Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredDeals.map((deal) => (
              <motion.div
                key={deal.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col group h-full"
              >
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col h-full border border-gray-100 transition-all hover:shadow-teal-500/20">
                  <div className="absolute top-6 right-6 z-20 bg-blue-900 text-teal-400 px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest uppercase shadow-lg">
                    {deal.tag}
                  </div>
                  <div className="overflow-hidden h-64">
                    <img
                      src={deal.img}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-grow text-center">
                    <h3 className="text-blue-900 text-2xl font-black uppercase mb-4 leading-tight italic">{deal.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                      {deal.desc}
                    </p>
                    <button className="w-full py-4 bg-gray-100 group-hover:bg-teal-600 text-blue-900 group-hover:text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300">
                      {deal.btn}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default Support;