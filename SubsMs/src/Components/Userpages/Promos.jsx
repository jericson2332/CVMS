


import React, { useState } from "react";
import promobanner from "../../assets/promo-banner.png";
import deal1 from "../../assets/new-install-less.jpg";
import deal2 from "../../assets/reconnect.jpg";
import deal3 from "../../assets/referral.jpg";



const deals = [
  {
    id: 1,
    category: "all",
    image: deal1,
    title: "Get a FREE Tapo Smart Bulb",
    description: "when you purchase PLDT StreamTV!",
    badge: null,
  },
  {
    id: 2,
    category: "new",
    image: deal2,
    title: "Fiber Sale",
    description:
      "Save ₱3,600 with free installation. Exclusive to Online and Retail applications.",
    badge: null,
  },
  {
    id: 3,
    category: "existing",
    image: deal3,
    title: "Get 50% off your monthly service fee",
    description:
      "for 6 months or free speedboost for 1 year when you switch!",
    badge: { text1: "SAVE ₱3600", text2: "FREE INSTALLATION" },
  },
];

const Promos = () => {
  

  const [filter, setFilter] = useState("all");

  const showDeal = (dealCategory) => {
    return filter === "all" || filter === dealCategory;
  };

  return (
    <>
      <div
        className="w-full h-[600px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${promobanner})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold"></h1>
          <p className="text-md md:text-lg mt-2"></p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold mb-6">
          Here are the top deals that we prepared just for you.
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === "all" ? "bg-black text-white" : "bg-gray-200"
              }`}
            onClick={() => setFilter("all")}
          >
            ALL
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === "new" ? "bg-black text-white" : "bg-gray-200"
              }`}
            onClick={() => setFilter("new")}
          >
            NEW SUBSCRIBERS
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === "existing" ? "bg-black text-white" : "bg-gray-200"
              }`}
            onClick={() => setFilter("existing")}
          >
            EXISTING SUBSCRIBERS
          </button>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {showDeal("all") && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              <img src={deals[0].image} alt={deals[0].title} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-red-600 text-lg font-semibold">{deals[0].title}</h3>
                <p className="text-gray-600 text-sm mt-2">{deals[0].description}</p>
              </div>
            </div>
          )}

          {showDeal("new") && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              <img src={deals[1].image} alt={deals[1].title} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-red-600 text-lg font-semibold">{deals[1].title}</h3>
                <p className="text-gray-600 text-sm mt-2">{deals[1].description}</p>
              </div>
            </div>
          )}

          {showDeal("existing") && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              {deals[2].badge && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-black text-white rounded-xl px-3 py-1 text-xs font-bold text-center">
                  <div>{deals[2].badge.text1}</div>
                  <div>{deals[2].badge.text2}</div>
                </div>
              )}
              <img src={deals[2].image} alt={deals[2].title} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-red-600 text-lg font-semibold">{deals[2].title}</h3>
                <p className="text-gray-600 text-sm mt-2">{deals[2].description}</p>
              </div>
            </div>
          )}
        </div>
      </section>




    </>
  );
};

export default Promos;
