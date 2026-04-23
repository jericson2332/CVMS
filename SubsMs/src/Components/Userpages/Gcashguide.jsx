import React from 'react';
import { motion } from "framer-motion";

// Assets
import Gguide from '../../assets/gcashbanner.png';
import gcashTech from "../../assets/man_1.png";

// Professional Tip: Import your step-specific images here
// Ensure these images are in your assets folder
import step1Img from "../../assets/gcash_step_1.jpg"; 
import step2Img from "../../assets/gcash_step_2.jpg"; 
import step3Img from "../../assets/gcash_step_3.jpg"; 
import step4Img from "../../assets/gcash_step_4.jpg"; 

/**
 * 1. UPDATED DATA
 * We add the 'img' property to each object.
 */
const GCASH_STEPS = [
  {
    step: "01",
    title: "Open GCash App",
    desc: "Log in to your GCash account and select 'Pay Bills' from the main dashboard.",
    img: step1Img
  },
  {
    step: "02",
    title: "Select Category",
    desc: "On your Pay Bills dashboard select 'Cable / Internet'. on Category List",
    img: step2Img
  },
  {
    step: "03",
    title: "Cable / Internet",
    desc: "Under the Cable / Internet, Search 'Cablevision Systems Corporation'",
    img: step3Img
  },
  {
    step: "04",
    title: "Fill-up the Form",
    desc: "Input your Account Number and the exact amount stated on your billing statement.",
    img: step4Img
  }
];

const Gcashguide = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* HERO SECTION */}
      <header
        className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${Gguide})` }}
      >
        <div className="absolute inset-0" />
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* TOP CONTENT: Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div {...fadeInUp} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-blue-600 uppercase leading-tight">
                Hassle-Free <br />
                <span className="text-teal-600">Digital Payments</span>
              </h2>
              <div className="w-24 h-2 bg-blue-900 rounded-full"></div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              We've partnered with **GCash** to make your monthly settlements seamless. No more long queues at the office—pay your bills from the comfort of your home, 24/7.
            </p>

            <div className="p-6 bg-blue-50 border-l-4 border-blue-900 rounded-r-2xl">
              <p className="text-blue-900 font-medium italic">
                "Our goal is to provide not just the fastest internet, but the most convenient customer experience."
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-500/100 rounded-[3rem] rotate-2" />
            <img
              src={gcashTech}
              alt="Payment convenience"
              className="relative rounded-[2.5rem] w-full h-[500px] object-cover shadow-2xl"
            />
          </motion.div>
        </div>

        {/* STEP BY STEP GRID - WITH IMAGES */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-black text-blue-950 uppercase tracking-tighter">How to pay via GCash</h3>
            <p className="text-slate-500 mt-2">Follow these 4 simple steps to settle your account.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GCASH_STEPS.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col overflow-hidden group transition-all"
              >
                {/* Image Container */}
                <div className="h-full overflow-hidden bg-slate-200">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col items-center text-center">
                  <span className="text-blue-700 font-black text-[15px] tracking-[0.2em] mb-1">STEP {item.step}</span>
                  <h4 className="text-lg font-bold text-blue-950 mb-3 leading-tight">{item.title}</h4>
                  <p className="text-slate-500 text-40px leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gcashguide;