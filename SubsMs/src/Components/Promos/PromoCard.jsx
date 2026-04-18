import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2 } 
  }
};

// We wrap the component in forwardRef to allow Framer Motion to measure it
const PromoCard = forwardRef(({ deal }, ref) => {
  return (
    <motion.div
      ref={ref} // CRITICAL: This allows popLayout to work
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group h-full"
    >
      <article className="bg-white rounded-[2.5rem] h-full shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-slate-100">
        {/* Image Section */}
        <div className="relative h-60 overflow-hidden">
          <div className="absolute top-5 right-5 z-10 bg-blue-900/90 backdrop-blur-md text-teal-400 px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest uppercase shadow-xl">
            {deal.tag}
          </div>
          <img
            src={deal.img}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Content Section */}
        <div className="p-10 flex flex-col flex-grow text-center">
          <h3 className="text-blue-950 text-2xl font-black mb-4 italic uppercase leading-tight">
            {deal.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
            {deal.desc}
          </p>
          <Link to={deal.path} 
          className="w-full py-4 bg-slate-100 group-hover:bg-teal-600 text-blue-900 group-hover:text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300">
            {deal.btn}
          </Link>
        </div>
      </article>
    </motion.div>
  );
});

// Setting a display name helps with debugging in React DevTools
PromoCard.displayName = "PromoCard";

export default PromoCard;