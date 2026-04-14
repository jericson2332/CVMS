import React from 'react'
import plan888 from "../../assets/PLAN888.jpg";

const Plan888 = () => {
  return (
    <div>
      <div
        className="w-full h-[980px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${plan888})` }}
      >
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50 z-0"></div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-7xl font-bold">PLAN 888</p>
          <p className="text-md md:text-lg mt-2">
            Please download and fill out all the required fields.
          </p>
        </div>

      </div>

    </div>
  )
}

export default Plan888