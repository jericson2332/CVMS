import React, { useState } from "react";
import supportbanner from "../../assets/support-banner2.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Update these imports or use icons
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

  const supportChannels = [
    {
      id: 1,
      category: "technical",
      title: "Technical Troubleshooting",
      desc: "Experiencing slow speeds or connection drops? Follow our step-by-step guide to get back online fast.",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      tag: "24/7 ONLINE",
      btn: "Start Diagnosis"
    },
    {
      id: 2,
      category: "billing",
      title: "Billing & Payments",
      desc: "View your current balance, download previous statements, or update your auto-payment methods.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
      tag: "ACCOUNT HELP",
      btn: "View Billing"
    },
    {
      id: 3,
      category: "technical",
      title: "Service Outages",
      desc: "Check for scheduled maintenance or reported service interruptions in your specific area.",
      img: "https://images.unsplash.com/photo-1581092921461-7d1570137289?auto=format&fit=crop&w=800&q=80",
      tag: "REAL-TIME STATUS",
      btn: "Check Area"
    },
    {
      id: 4,
      category: "billing",
      title: "Relocation Request",
      desc: "Moving to a new home? Schedule a technician to transfer your fiber line to your new address.",
      img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      tag: "MOVE REQUEST",
      btn: "Transfer Service"
    },
    {
      id: 5,
      category: "general",
      title: "Live Chat Support",
      desc: "Chat with a real representative for complex issues that require immediate personal attention.",
      img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      tag: "LIVE HELP",
      btn: "Connect Now"
    },
    {
      id: 6,
      category: "general",
      title: "Hardware Replacement",
      desc: "Request a new router or upgrade your current mesh system for better home coverage.",
      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      tag: "EQUIPMENT",
      btn: "Order Hardware"
    }
  ];

  const filteredSupport = filter === "" ? supportChannels : supportChannels.filter(item => item.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner Section */}
      <div
        className="w-full h-[500px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${supportbanner})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
          >
            HELP CENTER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl mt-4 font-bold tracking-widest text-teal-400 uppercase"
          >
            How can we help you today?
          </motion.p>
        </div>
      </div>

      {/* Main Support Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4 uppercase italic">Support Category</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">Select a category below to quickly find the assistance you need.</p>
          <div className="w-24 h-2 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link to="/faq" className="px-8 py-3 rounded-full text-xs font-black text-white bg-blue-900 hover:bg-teal-600 transition-all shadow-xl uppercase tracking-widest">
            KNOWLEDGE BASE (FAQ)
          </Link>
          <button
            className={`px-8 py-3 rounded-full text-xs font-black transition-all shadow-xl uppercase tracking-widest ${filter === "" ? "bg-teal-600 text-white" : "bg-white text-blue-900"}`}
            onClick={() => setFilter("")}
          >
            VIEW ALL
          </button>
          <button
            className={`px-8 py-3 rounded-full text-xs font-black transition-all shadow-xl uppercase tracking-widest ${filter === "technical" ? "bg-teal-600 text-white" : "bg-white text-blue-900"}`}
            onClick={() => setFilter("technical")}
          >
            TECHNICAL
          </button>
          <button
            className={`px-8 py-3 rounded-full text-xs font-black transition-all shadow-xl uppercase tracking-widest ${filter === "billing" ? "bg-teal-600 text-white" : "bg-white text-blue-900"}`}
            onClick={() => setFilter("billing")}
          >
            BILLING
          </button>
        </div>

        {/* Support Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredSupport.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col group h-full"
              >
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col h-full border border-gray-100 transition-all hover:border-teal-500/50">
                  <div className="absolute top-6 right-6 z-20 bg-blue-900 text-teal-400 px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest uppercase shadow-lg">
                    {item.tag}
                  </div>
                  <div className="overflow-hidden h-56">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-grow text-center">
                    <h3 className="text-blue-900 text-2xl font-black uppercase mb-4 leading-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                      {item.desc}
                    </p>
                    <button className="w-full py-4 bg-gray-100 group-hover:bg-teal-600 text-blue-900 group-hover:text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300">
                      {item.btn}
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