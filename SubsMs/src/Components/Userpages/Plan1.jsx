import React from 'react'
import plan1 from "../../assets/PLAN1.jpg";

const Plan1 = () => {
  return (
    <div
      className="w-full h-[980px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${plan1})` }}
    >
      {/* Overlay */}
      <div className="absolute w-full h-full  z-0"></div>
      <div className="relative z-10 text-center text-white px-4">
        <p className="text-7xl font-bold">PLAN 1</p>
        <p className="text-md md:text-lg mt-2">
          Please download and fill out all the required fields.
        </p>
      </div>

    </div>
  )
}

export default Plan1