import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUser, FaChevronDown, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineUserCircle, HiChevronDown } from "react-icons/hi2";
import logo from "../assets/3d2-Logo.png";
import axios from "axios";
import './start.css';

const SubNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({ services: false, more: false });
    const [userDropdownOpen, setUserDropdownOpen] = useState(false); /* For Desktop Login User */
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Services dropdown
    const [openService, setOpen] = useState(false);
    const handleToggle = () => setOpen(!openService);
    const handleMouseLeaveService = () => setOpen(false);

    // More dropdown
    const [openMore, setOpenMore] = useState(false);
    const handleToggleMore = () => setOpenMore(!openMore);
    const handleMouseLeaveMore = () => setOpenMore(false);
    //
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    //Calls setIsLoggedIn() automatically → triggers React re-render without full page reload
    useEffect(() => {
        const checkLogin = () => {
            const subsValid = localStorage.getItem("subsValid"); //
            setIsLoggedIn(!!subsValid);
        };

        // Run once on load
        checkLogin();
        window.addEventListener("storage", checkLogin);
        const interval = setInterval(checkLogin, 500);

        return () => {
            window.removeEventListener("storage", checkLogin);
            clearInterval(interval);
        };
    }, []);


    const handleLogout = () => {
        axios.get("http://localhost:3000/auth/subslogout")
            .then(() => {
                localStorage.removeItem("subsValid"); // ✅ only remove subscriber key
                setIsLoggedIn(false);
                navigate("/login");
            })
            .catch((err) => console.log("Logout failed:", err));
    };

    const toggleDropdown = (key) => {
        setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    };


    return (
        <>
            <nav className="bg-gray-50 text-blue-600 shadow-md font-medium">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-30">
                    {/* Logo */}
                    <Link to="/homepage" className="text-2xl font-bold">
                        <img src={logo} alt="CableVision Logo" className="h-28 w-auto object-contain" />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 items-center mt-5 text-lg/10">
                        <li><Link to="/homepage" className="hover:text-orange-400 text-decoration-none">Home</Link></li>
                        <li><Link to="/plans" className="relative inline-block  py-1 text-blue-600 
                        transition duration-300 ease-in-out 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:w-0 after:h-[2px] after:bg-orange-400 
                        hover:after:w-full after:transition-all after:duration-300 
                        after:ease-in-out text-decoration-none">Plans</Link></li>

                        {/* Services Dropdown */}
                        <li className="relative inline-block">
                            <button
                                onClick={handleToggle}
                                className="flex items-center gap-1.5 hover:text-orange-400"
                            >
                                Services
                                <FaChevronDown
                                    className={`transition-transform ${openService ? "rotate-180" : ""} text-sm mt-2`}
                                />
                            </button>
                            {openService && (
                                <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow w-48 text-center z-10" onMouseLeave={handleMouseLeaveService}>
                                    <li><Link to="/channellineup"
                                        className="block px-4 py-2 hover:bg-blue-100 rounded text-decoration-none">Channel Line Up</Link></li>
                                    {/* <li><Link to="/cable"
                                        className="block px-4 py-2 hover:bg-blue-100  text-decoration-none">Cable Only</Link></li> */}
                                    <li><Link to="/applynow"
                                        className="block px-4 py-2 hover:bg-blue-100 rounded text-decoration-none">Apply Now</Link></li>
                                </ul>
                            )}
                        </li>

                        <li><Link to="/promos" className="relative inline-block  py-1 text-blue-600 
                        transition duration-300 ease-in-out 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:w-0 after:h-[2px] after:bg-orange-400 
                        hover:after:w-full after:transition-all after:duration-300 
                        after:ease-in-out text-decoration-none">Promos</Link></li>
                        <li><Link to="/support" className="relative inline-block  py-1 text-blue-600 
                        transition duration-300 ease-in-out 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:w-0 after:h-[2px] after:bg-orange-400 
                        hover:after:w-full after:transition-all after:duration-300 
                        after:ease-in-out text-decoration-none">Help&Support</Link></li>
                        <li><Link to="/aboutus" className="relative inline-block  py-1 text-blue-600 
                        transition duration-300 ease-in-out 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:w-0 after:h-[2px] after:bg-orange-400 
                        hover:after:w-full after:transition-all after:duration-300 
                        after:ease-in-out text-decoration-none">About Us</Link></li>
                    </ul>

                    {/* Desktop Login User */}
                    {/* <div className="hidden md:flex relative">
                        <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 hover:text-orange-400">
                            <FaUser className="text-4xl" />
                            <FaChevronDown className={`transition-transform ${userDropdownOpen ? "rotate-180" : ""} text-sm mt-3`} />
                        </button>
                        {userDropdownOpen && (
                            <ul className="absolute left-0 mt-5 bg-white text-black rounded shadow w-40 text-center z-10">
                                {isLoggedIn ? (
                                    <>
                                        <li><Link to="/profile" className="block px-4 py-2 hover:bg-blue-100 text-decoration-none">Profile</Link></li>
                                        <li><Link to="/settings" className="block px-4 py-2 hover:bg-blue-100 text-decoration-none">Settings</Link></li>
                                        <li onClick={handleLogout} className="cursor-pointer block px-4 py-2 text-red-600 hover:bg-red-100 text-decoration-none">
                                            <FaSignOutAlt className="inline mr-2" /> Logout
                                        </li>
                                    </>
                                ) : (
                                    <li><Link to="/login" className="block px-4 py-2 hover:bg-blue-100 text-decoration-none"><FaSignInAlt className="inline mr-2" /> Login </Link></li>
                                )}
                            </ul>
                        )}
                    </div> */}

                    <div
                        className="hidden md:flex relative"
                        // Handles the "In and Out" logic
                        onMouseEnter={() => setUserDropdownOpen(true)}
                        onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                        {/* The Trigger Icon */}
                        <div className="flex flex-col items-center gap-1 group">
                            {/* The Trigger Button */}
                            <button
                                className="flex items-center justify-center p-1 rounded-full transition-all duration-200"
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            >
                                <div className="flex h-12 w-20 items-center justify-center rounded-full border-2 border-transparent bg-gradient-to-tr from-blue-400 to-blue-950 text-xs font-bold text-white 
                                shadow-sm transition-all group-hover:border-orange-500">
                                    MYCV
                                </div>
                            </button>

                            {/* Label below the button */}
                            <span className="text-[10px] font-bold uppercase tracking-tight text-gray-500 transition-colors group-hover:text-orange-500">
                                Account
                            </span>
                        </div>

                        {/* The Dropdown Menu */}
                        {userDropdownOpen && (
                            <div className="absolute left-0 top-full w-40 z-10 pt-2">
                                {/* The 'pt-2' above acts as a bridge. The 'ul' below is the visible menu. */}
                                <ul className="bg-white text-black rounded shadow-xl overflow-hidden text-center border border-gray-100">
                                    {isLoggedIn ? (
                                        <>
                                            <li className="border-b border-gray-50">
                                                <Link to="/profile" className="block px-4 py-1 hover:bg-blue-50 text-blue-600 transition-colors text-decoration-none">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li className="border-b border-gray-50">
                                                <Link to="/settings" className="block px-4 py-1 hover:bg-blue-50 text-blue-600 transition-colors text-decoration-none">
                                                    Settings
                                                </Link>
                                            </li>
                                            <li
                                                onClick={handleLogout}
                                                className="cursor-pointer block px-4 py-1 text-red-600 hover:bg-red-50 transition-colors text-decoration-none"
                                            >
                                                <FaSignOutAlt className="inline mr-2" /> Logout
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <Link to="/login" className="block px-4 py-1 hover:bg-blue-50 text-blue-600  transition-colors text-decoration-none">
                                                <FaSignInAlt className="inline mr-2" /> Login
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <ul
                        className="fixed top-28 left-0 w-full bg-blue-600 px-4 pb-4 space-y-2 text-white z-50"
                        style={{ maxHeight: "calc(100vh - 7rem)", overflowY: "auto" }} // Scrollable if long
                    >
                        <li>
                            <Link
                                to="/homepage"
                                className="block py-2 hover:bg-blue-500 text-white text-decoration-none"
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/plans"
                                className="block py-2 hover:bg-blue-500 text-white text-decoration-none"
                                onClick={() => setMenuOpen(false)}
                            >
                                Plans
                            </Link>
                        </li>

                        {/* Services */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("services")}
                                className="flex justify-between w-full py-2 hover:bg-blue-500 text-white text-decoration-none"
                            >
                                Services{" "}
                                <FaChevronDown
                                    className={`${dropdownOpen.services ? "rotate-180" : ""}`}
                                />
                            </button>
                            {dropdownOpen.services && (
                                <ul className="pl-4 space-y-1">
                                    <li>
                                        <Link
                                            to="/channellineup"
                                            className="block py-1 px-3 hover:bg-blue-700 rounded text-white text-decoration-none"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Channel Line Up
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/cable"
                                            className="block py-1 px-3 hover:bg-blue-700 rounded text-white text-decoration-none"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Cable
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/applynow"
                                            className="block py-1 px-3 hover:bg-blue-700 rounded text-white text-decoration-none"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Apply Now
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <Link
                                to="/corporate"
                                className="block py-2 hover:bg-blue-500 text-white text-decoration-none"
                                onClick={() => setMenuOpen(false)}
                            >
                                Corporate
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/promos"
                                className="block py-2 hover:bg-blue-500 text-white text-decoration-none"
                                onClick={() => setMenuOpen(false)}
                            >
                                Promos
                            </Link>
                        </li>

                        {/* More */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("more")}
                                className="flex justify-between w-full py-2 hover:bg-blue-500 text-white"
                            >
                                More{" "}
                                <FaChevronDown
                                    className={`${dropdownOpen.more ? "rotate-180" : ""}`}
                                />
                            </button>
                            {dropdownOpen.more && (
                                <ul className="pl-4 space-y-1">
                                    <li>
                                        <Link
                                            to="/faq"
                                            className="block py-1 px-3 hover:bg-blue-700 text-white rounded text-decoration-none"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/support"
                                            className="block py-1 px-3 hover:bg-blue-700 text-white rounded text-decoration-none"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Support
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/aboutus"
                                            className="block py-1 px-3 hover:bg-blue-700 text-white rounded text-decoration-none"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* User Login/Logout */}
                        <li>
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="block py-2 hover:bg-blue-500 text-decoration-none"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="block py-2 hover:bg-blue-500 text-decoration-none"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false);
                                        }}
                                        className="w-full text-left py-2 text-red-300 hover:bg-red-500 text-decoration-none"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block py-2 hover:bg-blue-500 text-white text-decoration-none"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                )}

            </nav>
            <Outlet />
        </>
    );
};

export default SubNavbar;
