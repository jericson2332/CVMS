import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"; // ✅ Correct way to import Link
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.jpg";
import homeCard from "../../assets/Marketing-plan3.png";
import cvms from "../../assets/cmvs_business.png";
import newsintallless from "../../assets/new-install-less.jpg";
import recon from "../../assets/reconnect.jpg";
import refer from "../../assets/referral.jpg";

// ICON //
import GcashIcon from "../../assets/gcash.png"
import { FiHelpCircle } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi'
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const images = [banner1, banner2, banner3, banner4];

const HomePage = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-blue-800 pb-1.5" />
      {/* === Carousel === */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-[3000ms] ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
            width: "100%",
            height: "100%"
          }}
        >
          <div className="w-full h-full flex-shrink-0">
            <img src={banner1} alt="Slide 1" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-full flex-shrink-0">
            <img src={banner2} alt="Slide 2" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-full flex-shrink-0">
            <img src={banner3} alt="Slide 3" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-full flex-shrink-0">
            <img src={banner4} alt="Slide 4" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 text-black text-4xl bg-white/60 hover:bg-white/80 rounded-full px-2 py-1 z-10"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-black text-4xl bg-white/60 hover:bg-white/80 rounded-full px-2 py-1 z-10"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-white" : "bg-gray-400"}`} />
          <div className={`w-3 h-3 rounded-full ${index === 1 ? "bg-white" : "bg-gray-400"}`} />
          <div className={`w-3 h-3 rounded-full ${index === 2 ? "bg-white" : "bg-gray-400"}`} />
          <div className={`w-3 h-3 rounded-full ${index === 3 ? "bg-white" : "bg-gray-400"}`} />
        </div>
      </div>

      {/* === Content Below Carousel === */}
      <div className=" py-12 px-4 sm:px-6"> {/**bg-gray-100*/}
        <div className="text-blue-600  ">
          <p className="text-center text-3xl sm:text-4xl md:text-5xl font-bold transition-transform transform hover:scale-105 duration-500 ease-in-out pb-2 ">
            Discover Our Services
          </p>
          <p className="text-2xl text-black text-center pb-10">Connecting Communities with Smarter Solutions. Discover What We Offer.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center w-full px-4">
          {/* Home Card */}
          <div className="transition-transform transform hover:scale-105 duration-500 ease-in-out w-full max-w-[400px]">
            <div
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl/60"
              style={{
                backgroundImage: `url(${homeCard})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/60 p-6 flex flex-col justify-between">
                <div>
                  <h1 className="text-black text-xl sm:text-2xl font-bold text-center">
                    Digital<br /> Cable & Internet
                  </h1>
                </div>
                <div>
                  <Link
                    to="/plans"
                    className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium py-2 px-6 mb-2 rounded text-decoration-none"
                  >
                    SEE PLANS
                  </Link>
                  <p className="text-black text-sm font-medium">
                    Connections that bring out the best in everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Card */}
          <div className="transition-transform transform hover:scale-105 duration-500 ease-in-out w-full max-w-[400px]">
            <div
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl/60"
              style={{
                backgroundImage: `url(${cvms})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-between text-white">
                <div>
                  <h1 className="text-white text-xl sm:text-2xl font-bold text-center">
                    Business <br /> Bundle
                  </h1>
                </div>
                <div>
                  <Link
                    to="/cable"
                    className="inline-block bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2 px-6 mb-2 rounded text-decoration-none"
                  >
                    SEE PLANS
                  </Link>
                  <p className="text-white text-sm font-medium">
                    Solutions that scale up to great opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**EXITING OFFERS CARDS*/}
      <div className="bg-white py-12 px-4 text-blue-600 font-extrabold">
        <div className="text-blue-600 font-semibold">
          <p className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold transition-transform transform hover:scale-105 duration-500 ease-in-out pb-6">
            Exciting Offers
          </p>
        </div>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-2">
          {/* First Card */}
          <div className="bg-white text-orange-600 shadow-md/40 rounded-md overflow-hidden border">
            <img src={newsintallless} alt="Switch & Save Today!" className="w-full h-60 object-cover transition-transform transform hover:scale-105 duration-500 ease-in-out" />
            <div className="p-5 text-center">
              <h3 className="font-bold text-blue-900 text-lg mb-2">Switch & Save Today!</h3>
              <p className="text-gray-700 text-sm">
                Make the smart move with CableVision and enjoy amazing discounts and added value.
              </p>
              <button className="mt-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-5 rounded transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-white text-orange-600 shadow-md/40 rounded-md overflow-hidden border">
            <img src={recon} alt="Reconnect for Rewards" className="w-full h-60 object-cover transition-transform transform hover:scale-105 duration-700 overflow-hidden" />
            <div className="p-5 text-center">
              <h3 className="font-bold text-blue-900 text-lg mb-2">Reconnect for Rewards</h3>
              <p className="text-gray-700 text-sm">
                Former customers can enjoy exclusive comeback deals you won’t want to miss.
              </p>
              <button className="mt-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-5 rounded transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Third Card */}
          <div className="bg-white text-orange-600 shadow-md/40 rounded-md overflow-hidden border">
            <img src={refer} alt="Invite Friends, Earn Big" className="w-full h-60 object-cover transition-transform transform hover:scale-105 duration-500 ease-in-out" />
            <div className="p-5 text-center">
              <h3 className="font-bold text-blue-900 text-lg mb-2">Invite Friends, Earn Big</h3>
              <p className="text-gray-700 text-sm">
                Refer your friends and reduce your monthly bill—it’s that simple!
              </p>
              <button className="mt-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-5 rounded transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* For Online Services */}
      <div className="py-24 px-8 bg-white text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-4xl sm:text-5xl font-extrabold text-blue-700 transition-transform transform hover:scale-105 duration-500 ease-in-out mb-5 tracking-tight">
            Check Our Online Services
          </p>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            As the Philippines’ leading internet service provider, we know how crucial connectivity is to your everyday life. <br />
            <span className="font-semibold text-slate-950">Explore our digital solutions for seamless access.</span>
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {/* Card 1: Pay Bills Online */}
          <Link to="/gcashguide" className="group flex flex-col items-center bg-white p-9 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-decoration-none">
            <div className="bg-blue-50 p-5 rounded-full mb-6">
              <img src={GcashIcon} className="text-blue-600 text-5xl h-12" alt="GCash" />
            </div>
            <h4 className="font-semibold text-lg text-slate-900 mb-3 text-center">
              Pay Bills Online
            </h4>
            <p className="text-slate-500 text-sm mb-7 text-center">
              Conveniently manage payments with your GCash app.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              <span>View Guide</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Card 2: Topics & FAQs */}
          <Link to="/faq" className="group flex flex-col items-center bg-white p-9 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-decoration-none">
            <div className="bg-blue-50 p-5 rounded-full mb-6">
              <FiSearch className="text-blue-600 text-5xl h-12 w-12" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900 mb-3 text-center">
              Topics & FAQs
            </h3>
            <p className="text-slate-500 text-sm mb-7 text-center">
              Find quick answers to common support queries.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              <span>Visit knowledge base</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Card 3: Self Service Application */}
          <Link to="/applynow" className="group flex flex-col items-center bg-white p-9 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-decoration-none">
            <div className="bg-blue-50 p-5 rounded-full mb-6">
              <HiOutlineClipboardDocument className="text-blue-600 text-5xl h-12 w-12" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900 mb-3 text-center">
              Self-Service Application
            </h3>
            <p className="text-slate-500 text-sm mb-7 text-center">
              Apply for new plans or upgrades seamlessly.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              <span>Get started</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Card 4: Customer Service */}
          <Link className="group flex flex-col items-center bg-white p-9 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-decoration-none">
            <div className="bg-blue-50 p-5 rounded-full mb-6">
              <TfiHeadphoneAlt className="text-blue-600 text-5xl h-12 w-12" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900 mb-3 text-center">
              Customer Support
            </h3>
            <p className="text-slate-500 text-sm mb-7 text-center">
              Connect with our dedicated support agents.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              <span>Contact agents</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>



    </div>

  );
};

export default HomePage;
