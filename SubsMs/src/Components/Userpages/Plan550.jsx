import React from 'react'
import plan550 from "../../assets/PLAN888.jpg";
// Note: You can import a new image here, e.g., import fiberImg from "../../assets/fiber-tech.jpg";
import { motion } from "framer-motion";

const Plan550 = () => {
  return (
    <div>
      <div
        className="w-full h-[980px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${plan550})` }}
      >
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50 z-0"></div>
        <div className="relative z-10 text-center text-white px-4">

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold">

            BUDGET FRIENDLY PLAN 550
          </motion.p>
        </div>
      </div>


      <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* right Side */}
          <div className="order-1 lg:order-1 text-center lg:text-left px-4">
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold text-blue-900 leading-tight">
              BUDGET FRIENDLY PLAN 550
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-700 mt-4 text-lg">
              Each color portrays a different feeling or emotion, and by understanding the psychology of color,
              you can choose a color that will resonate with your target audience and give off the vibe & emotion you want.
            </motion.p>
          </div>

          {/* left Side: Form Card */}
          <div className="order-2 lg:order-2 w-full bg-white p-8 rounded-3xl shadow-2xl">
            <p className="text-5xl font-bold text-blue-900">SITE INSPECTION</p>
            <p className="text-lg font-semibold">
              “Slots are filling up fast! Check now if fiber is available in your area—secure yours today!”
            </p>

            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="text" placeholder="Mobile Number" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="text" placeholder="Full Address" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />
              <input type="text" placeholder="Landmark" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />

              <select className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none">
                <option value="">Select your preferred plan</option>
                <option value="BF Plan 550">BF Plan 550</option>
                <option value="Plan 888">Plan 888</option>
                <option value="Plan 1">Plan 1</option>
                <option value="Plan 2">Plan 2</option>
                <option value="Plan 3">Plan 3</option>
              </select>

              <label className="block text-sm text-gray-700 mt-2">
                Preferred Installation Time
              </label>
              <input type="date" className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none mb-2" />

              <input type="text" placeholder="Enter Promo Code (if any)" className="w-full px-4 py-2 bg-gray-100 rounded-md" />


              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* --- NEW SECTION: PLAN INFORMATION AND ADDITIONAL IMAGE --- */}
        <div className="w-full max-w-7xl mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Info Card 1: Technical Details */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-teal-500"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-2">High-Speed Fiber</h3>
              <p className="text-gray-600">Experience seamless streaming and lag-free gaming with our dedicated fiber optic line designed for budget-conscious families.</p>
            </motion.div>

            {/* Info Card 2: The Picture Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative h-64 md:h-full min-h-[250px] rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Replace the URL below with your actual asset variable if preferred */}
              <img 
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80" 
                alt="Fiber Technology" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">Reliable Connectivity 24/7</p>
              </div>
            </motion.div>

            {/* Info Card 3: Support Details */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-teal-500"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our Plan 550 includes priority technical support and a free router installation for all new residential applications.</p>
            </motion.div>

          </div>
        </div>
        {/* --- END OF NEW SECTION --- */}

      </div>

    </div>
  )
}

export default Plan550