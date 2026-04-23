import React from 'react';
import { motion } from "framer-motion";
import aboutHero from "../../assets/PLAN888.jpg";
import aboutTech from "../../assets/aboutusTech.jpg";
const Aboutus = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="overflow-hidden bg-gray-50">
      {/* HERO SECTION */}
      <div
        className="w-full h-[650px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="absolute w-full h-full bg-black/60 z-0"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold uppercase tracking-tighter"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl mt-4 text-teal-400 font-medium"
          >
            Connecting Communities, One Household at a Time.
          </motion.p>
        </div>
      </div>

      {/* STATS COUNTER SECTION - New Impactful Data */}
      <div className="w-full py-12 bg-blue-900 text-white shadow-2xl relative z-20 -mt-16 max-w-6xl mx-auto rounded-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          <div>
            <h3 className="text-4xl font-bold text-teal-400">10k+</h3>
            <p className="text-sm uppercase tracking-widest mt-2">Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-teal-400">99.9%</h3>
            <p className="text-sm uppercase tracking-widest mt-2">Uptime Rate</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-teal-400">24/7</h3>
            <p className="text-sm uppercase tracking-widest mt-2">Expert Support</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-teal-400">4</h3>
            <p className="text-sm uppercase tracking-widest mt-2">Municipalities Covered</p>
          </div>
        </div>
      </div>


      {/* WHO WE ARE SECTION - EXPANDED */}
      <div className="w-full py-24 px-4 bg-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE: Text Content */}
            <motion.div {...fadeIn} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-blue-900 uppercase leading-tight">
                  More Than Just <br />
                  <span className="text-teal-600">An Internet Provider</span>
                </h2>
                <div className="w-24 h-2 bg-blue-900"></div>
              </div>

              <p className="text-gray-700 text-xl leading-relaxed font-light italic">
                "We didn't just want to build a business; we wanted to build a bridge to the future for every household."
              </p>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <strong>Cablevision Systems Corporation </strong> was conceptualized by five classmates from Class 1960 of Pedro
                  Guevara Memorial High School. It was founded and registered with the Securities and Exchange Commission
                  on October 10, 1992. The company was established to operate CATV Systems primarily in Sta. Cruz, Laguna
                  and adjacent municipalities.

                </p>
                <p>
                  The success of Cablevision throughout the years of each operation enabled us to expand and go beyond cable TV service.
                  In July 2012, MyCV Broadband (Cable Internet) was launched. Since then our <strong>cable internet </strong> performance has been known
                  as a very good compared to competition. This coming April 2014 the Company will be launching the prepaid cable internet.
                </p>
              </div>

              {/* Added: Mini-Icon Row */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-gray-50 rounded-2xl border-b-4 border-teal-500">
                  <span className="text-3xl block mb-2">🚀</span>
                  <span className="text-xs font-bold uppercase text-blue-900 tracking-tighter">Fast Deployment</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl border-b-4 border-blue-900">
                  <span className="text-3xl block mb-2">🛡️</span>
                  <span className="text-xs font-bold uppercase text-blue-900 tracking-tighter">Secure Lines</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl border-b-4 border-teal-500">
                  <span className="text-3xl block mb-2">🤝</span>
                  <span className="text-xs font-bold uppercase text-blue-900 tracking-tighter">Local Support</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Visual Card & Floating Stats */}
            <div className="relative">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="bg-white p-4 rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
              >
                <img
                  src={aboutTech}
                  alt="Fiber Technician working"
                  className="rounded-[2.5rem] w-full h-[610px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-teal-600 text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block"
              >
                <p className="text-4xl font-bold">100%</p>
                <p className="text-sm font-semibold uppercase tracking-widest">Fiber Optic</p>
              </motion.div>
            </div>
          </div>

          {/* NEW: Secondary "Our Promise" Grid within Who We Are */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-blue-900 group transition-colors duration-300">
              <h4 className="text-2xl font-bold text-blue-900 group-hover:text-teal-400 mb-4 uppercase">Reliability</h4>
              <p className="text-gray-600 group-hover:text-white transition-colors">We use weather-resistant underground cabling to ensure that your connection stays strong even during the toughest seasons.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-blue-900 group transition-colors duration-300">
              <h4 className="text-2xl font-bold text-blue-900 group-hover:text-teal-400 mb-4 uppercase">Affordability</h4>
              <p className="text-gray-600 group-hover:text-white transition-colors">Our business model is built on efficiency. We focus on what matters—speed and uptime—without the unnecessary corporate overhead.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-blue-900 group transition-colors duration-300">
              <h4 className="text-2xl font-bold text-blue-900 group-hover:text-teal-400 mb-4 uppercase">Community</h4>
              <p className="text-gray-600 group-hover:text-white transition-colors">We hire locally. When you call for support, you're talking to a neighbor who understands your area and cares about your connection.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION & VISION SECTION */}
      <div className="w-full py-24 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* MISSION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE: MISSION Text Content */}
            <div className="relative">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="bg-white p-4 rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
              >
                <img
                  src={aboutTech}
                  alt="Fiber Technician working"
                  className="rounded-[2.5rem] w-full h-[610px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Floating Badge */}
              {/* <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-teal-500 text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block"
              >
                <p className="text-4xl font-bold">100%</p>
                <p className="text-sm font-semibold uppercase tracking-widest">Fiber Optic</p>
              </motion.div> */}
            </div>
            {/* RIGHT SIDE: MISSION CONTENT*/}
            <motion.div {...fadeIn} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-blue-900 uppercase leading-tight">
                  MISSION<br />
                  <span className="text-teal-600">OF CABLEVISION</span>
                </h2>
                <div className="w-24 h-2 bg-blue-900"></div>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  To make available the benefits of <strong>CATV</strong> Technology to the largest numbers of subscribers possible.

                </p>
                <p>
                  To be a model company where shareholders, management as well as workers fully participate in the development
                  and share in the benefits of the company’s operations
                </p>
              </div>
            </motion.div>
          </div>

          {/* VISSION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24 ">
            {/* LEFT SIDE: VISION Text Content */}
            <motion.div {...fadeIn} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-blue-900 uppercase leading-tight">
                  VISION<br />
                  <span className="text-teal-600">OF CABLEVISION</span>
                </h2>
                <div className="w-24 h-2 bg-blue-900"></div>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  To be a relevant, dynamic <strong>telecommunications</strong> organization serving the information, 
                  entertainment and cultural needs of the community.
                </p>
              </div>
            </motion.div>

            {/* RIGHT SIDE: VISION CONTENT*/}
            <div className="relative">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="bg-white p-4 rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
              >
                <img
                  src={aboutTech}
                  alt="Fiber Technician working"
                  className="rounded-[2.5rem] w-full h-[610px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Floating Badge */}
              {/* <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-teal-500 text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block"
              >
                <p className="text-4xl font-bold">100%</p>
                <p className="text-sm font-semibold uppercase tracking-widest">Fiber Optic</p>
              </motion.div> */}
            </div>
          </div>
        </div>
      </div>

      {/* LEADERSHIP SECTION - New Human Element */}
      {/* <div className="w-full py-20 bg-gray-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-900">OUR LEADERSHIP</h2>
            <p className="text-gray-600 mt-4">The visionaries behind the network.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -15 }}
                className="bg-white p-6 rounded-3xl shadow-xl text-center border-b-8 border-teal-600"
              >
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md">
                  <img src={`https://i.pravatar.cc/150?img=${item + 10}`} alt="Executive" />
                </div>
                <h4 className="text-2xl font-bold text-blue-900 uppercase">Director {item}</h4>
                <p className="text-teal-600 font-semibold mb-4">Operations & Strategy</p>
                <p className="text-gray-500 text-sm italic">"Driven by excellence, committed to connecting every home."</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* OUR JOURNEY SECTION - New Timeline */}
      <div className="w-full py-24 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-16 uppercase">Our Journey</h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">

            <motion.div {...fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-900 text-teal-400 font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">2020</div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-blue-900">The Beginning</h4>
                <p className="text-gray-600 text-sm">Founded with just a team of 5 in a small garage office.</p>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-teal-600 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">2023</div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-blue-900">Regional Expansion</h4>
                <p className="text-gray-600 text-sm">Reached 5,000 active subscribers and launched Plan 550.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;