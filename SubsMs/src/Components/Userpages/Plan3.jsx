import React from 'react'
import plan3 from "../../assets/PLAN3.png";
import { motion } from "framer-motion";

const Plan3 = () => {
  return (
    <div
      className="w-full h-[980px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${plan3})` }}
    >
      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-widest uppercase text-cyan-400 mb-4"
        >
          Built for Modern Homes
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold"
        >
          PLAN 3
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl mt-6 font-semibold text-gray-100"
        >
          Perfect for Streaming, Gaming, and Work From Home
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-md md:text-lg mt-4 text-gray-300 leading-relaxed"
        >
          Enjoy fast, stable, and seamless internet across your entire home.
          Designed to handle multiple devices without lag or interruptions.
        </motion.p>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
            <span className="text-2xl">📡</span>
            <p className="font-semibold">Wi-Fi 6 Technology</p>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
            <span className="text-2xl">🏠</span>
            <p className="font-semibold">Wi-Fi 6 Mesh Coverage</p>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
            <span className="text-2xl">⚡</span>
            <p className="font-semibold">
              Up to <span className="text-white">800 Mbps</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Plan3