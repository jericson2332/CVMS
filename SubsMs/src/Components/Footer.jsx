// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-blue-800 text-white py-10 px-6">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
//         {/* Brand */}
//         <div>
//           <h1 className="text-3xl font-bold tracking-wide">
//             Cable<span className="text-white">vision</span>
//           </h1>
//           <p className="mt-2 text-gray-200 text-sm max-w-xs">
//             Bringing you reliable and affordable connectivity services.
//           </p>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex flex-col gap-2 text-lg text-white">
//           <Link to="/" className="relative inline-block py-1 text-white 
//              transition duration-300 ease-in-out 
//              after:content-[''] after:absolute after:left-0 after:bottom-0 
//              after:w-0 after:h-[2px] after:bg-white 
//              hover:after:w-full after:transition-all after:duration-300 after:ease-in-out text-decoration-none">Home</Link>
//           <Link to="/plans" className="relative inline-block py-1 text-white 
//              transition duration-300 ease-in-out 
//              after:content-[''] after:absolute after:left-0 after:bottom-0 
//              after:w-0 after:h-[2px] after:bg-white 
//              hover:after:w-full after:transition-all after:duration-300 after:ease-in-out text-decoration-none">Plans</Link>
//           <Link to="/corporate" className="relative inline-block py-1 text-white 
//              transition duration-300 ease-in-out 
//              after:content-[''] after:absolute after:left-0 after:bottom-0 
//              after:w-0 after:h-[2px] after:bg-white 
//              hover:after:w-full after:transition-all after:duration-300 after:ease-in-out text-decoration-none">Corporate</Link>
//           <Link to="/promos" className="relative inline-block py-1 text-white 
//              transition duration-300 ease-in-out 
//              after:content-[''] after:absolute after:left-0 after:bottom-0 
//              after:w-0 after:h-[2px] after:bg-white 
//              hover:after:w-full after:transition-all after:duration-300 after:ease-in-out text-decoration-none">News & Promos</Link>
//           <Link to="/applynow" className="relative inline-block py-1 text-white 
//              transition duration-300 ease-in-out 
//              after:content-[''] after:absolute after:left-0 after:bottom-0 
//              after:w-0 after:h-[2px] after:bg-white 
//              hover:after:w-full after:transition-all after:duration-300 after:ease-in-out text-decoration-none">Apply Now</Link>
//         </div>


//         {/* Social Media */}
//         <div className="flex gap-4">
//           <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white transition duration-300 ease-in-out  hover:bg-blue-500 hover:scale-150 ">
//             <FaFacebookF size={30} />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white transition duration-300 ease-in-out  hover:bg-blue-500 hover:scale-150 ">
//             <FaTwitter size={30} />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white transition duration-300 ease-in-out  hover:bg-blue-500 hover:scale-150 ">
//             <FaInstagram size={30} />
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white transition duration-300 ease-in-out  hover:bg-blue-500 hover:scale-150 ">
//             <FaLinkedinIn size={30} />
//           </a>
//         </div>
//       </div>

//       {/* Bottom Text */}
//       <div className="text-center text-sm text-gray-200 mt-8 border-t border-gray-100 pt-4">
//         © {new Date().getFullYear()} Cablevision. All rights reserved.
//       </div>
//     </footer>
//   )
// }

// export default Footer

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Consistent with your other pages

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-16 px-6 relative overflow-hidden">
      {/* Decorative Teal Glow to match your brand */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        {/* Column 1: Brand & Identity */}
        <div className="space-y-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Cable<span className="text-teal-400">vision</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Architecting the future of regional connectivity through proprietary fiber-optic infrastructure and zero-latency engineering.
          </p>
          {/* Social Media - Redesigned with teal circles */}
          <div className="flex gap-3 pt-2">
            {[
              { icon: <FaFacebookF />, link: "https://www.facebook.com/mycv.cablevision" },
              { icon: <FaTwitter />, link: "https://twitter.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
              { icon: <FaLinkedinIn />, link: "https://linkedin.com" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-teal-500 hover:text-white transition-all duration-300 hover:-translate-y-1 border border-white/10"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-2">Navigation</h4>
          <Link to="/" className="!text-white transition-colors text-sm w-fit group text-decoration-none">
            Home <span className="block h-0.5 w-0 bg-teal-500 group-hover:w-full transition-all duration-300 "></span>
          </Link>
          <Link to="/plans" className="!text-white transition-colors text-sm w-fit group text-decoration-none">
            Fiber Plans <span className="block h-0.5 w-0 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/corporate" className="!text-white transition-colors text-sm w-fit group text-decoration-none">
            Corporate Solutions <span className="block h-0.5 w-0 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/promos" className="!text-white transition-colors text-sm w-fit group text-decoration-none">
            News & Promos <span className="block h-0.5 w-0 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Column 3: Support & Contact */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-2">Direct Help</h4>
          <Link to="/applynow" className="!text-white transition-colors text-sm w-fit group text-decoration-none">
            Apply Now <span className="block h-0.5 w-0 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaPhoneAlt className="text-teal-500" /> <span>(049) 501-1495 / (049) 501-8501 </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaEnvelope className="text-teal-500" /> <span>mycvitdept@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter / Status */}
        <div className="space-y-4">
          <h4 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-2">Network Status</h4>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-gray-300">All Systems Operational</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-tighter">Verified: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

      </div>

      {/* Bottom Legal Text */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} CABLEVISION SYSTEMS CORPORATION
        </p>
        <div className="flex gap-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          <span className="hover:text-teal-500 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-teal-500 cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;