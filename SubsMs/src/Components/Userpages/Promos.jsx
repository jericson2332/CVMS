import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import PromoCard from "../Promos/PromoCard";

// Assets & Data
import promobanner from "../../assets/promo-banner.png";
import { DEALS_DATA } from "../../data/deals";

const Promos = () => {
  const [filter, setFilter] = useState("all");

  // Filter logic memoized for performance
  const filteredDeals = useMemo(() => {
    return filter === "all"
      ? DEALS_DATA
      : DEALS_DATA.filter((deal) => deal.category === filter);
  }, [filter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <header
        className="relative w-full h-[55vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${promobanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase"
          >
            Promos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-teal-400 font-bold tracking-[0.3em] uppercase mt-2"
          >
            Limited Time Offers
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Filter Bar */}
        <nav className="flex flex-wrap justify-center gap-4 mb-20">
          {["all", "new", "existing"].map((type) => {
            // Explicit Labels for the buttons
            const labels = {
              all: "View All",
              new: "New Subscribers",
              existing: "Existing Users",
            };

            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-10 py-3 rounded-full text-[11px] font-black tracking-widest uppercase transition-all shadow-lg ${
                  filter === type
                    ? "bg-teal-600 text-white scale-105 shadow-teal-500/20"
                    : "bg-white text-blue-900 hover:bg-slate-50"
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </nav>

        {/* Grid Container */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredDeals.map((deal) => (
              <PromoCard key={deal.id} deal={deal} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium italic">
              No promotions found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Promos;