import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./dashboard.css";
import axios from "axios";
import {
	Settings,
	Bell,
	Menu,
	X,
	LogOut,
	LayoutDashboard,
	Users,
	FilePlus2,
	Calculator,
	FolderKanban,
	UserCircle,
	BarChart3,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const NotificationBell = () => {
	const [open, setOpen] = useState(false);
	const [applications, setApplications] = useState([]); // unseen notifications
	const [recentlyViewed, setRecentlyViewed] = useState([]);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	const NOTIFICATION_EXPIRY = 3 * 60 * 1000; // 3 mins auto-remove
	const RECENTLY_VIEWED_EXPIRY = 60 * 1000; // 1 min
	const SEEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

	// Load seen notifications with timestamps
	const getSeenData = () => {
		return JSON.parse(localStorage.getItem("seenNotifications") || "[]");
	};

	const saveSeenData = (data) => {
		localStorage.setItem("seenNotifications", JSON.stringify(data));
	};

	// Clean expired (3 mins expiry for active notifications)
	const cleanExpired = (apps) => {
		const now = Date.now();
		return apps.filter((a) => now - (a.timestamp || now) < NOTIFICATION_EXPIRY);
	};

	const fetchApplications = () => {
		axios
			.get("http://localhost:3000/auth/application")
			.then((res) => {
				if (res.data.Status) {
					const fetchedApps = res.data.Result;
					const seenData = getSeenData();
					const now = Date.now();

					// Keep only entries seen within the last 24 hrs
					const validSeen = seenData.filter(
						(s) => now - s.timestamp < SEEN_EXPIRY
					);
					saveSeenData(validSeen); // clean storage

					setApplications((prev) => {
						const validPrev = cleanExpired(prev);

						// Only add apps not seen in the last 24 hrs
						const newApps = fetchedApps
							.filter(
								(app) =>
									!validPrev.some((p) => p.id === app.id) &&
									!validSeen.some((s) => s.id === app.id)
							)
							.map((a) => ({ ...a, timestamp: now }));

						// Auto-remove after expiry (3 mins)
						newApps.forEach((app) => {
							setTimeout(() => {
								setApplications((current) =>
									current.filter((a) => a.id !== app.id)
								);
								// Mark as seen when auto-removed
								const updatedSeen = [
									...getSeenData(),
									{ id: app.id, timestamp: Date.now() },
								];
								saveSeenData(updatedSeen);
							}, NOTIFICATION_EXPIRY);
						});

						return [...validPrev, ...newApps];
					});
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetchApplications();
		const interval = setInterval(fetchApplications, 10000); // every 10s
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const unreadCount = applications.length;

	const handleToggle = () => {
		setOpen(!open);
	};

	// When clicking a notification
	const handleClickNotification = async (app) => {
		try {
			// ✅ Update backend DB
			await axios.put(`http://localhost:3000/auth/application/${app.id}/seen`);

			// ✅ Save as seen locally
			const updatedSeen = [...getSeenData(), { id: app.id, timestamp: Date.now() }];
			saveSeenData(updatedSeen);

			// ✅ Remove from bell
			setApplications((current) => current.filter((a) => a.id !== app.id));

			// ✅ Recently viewed (local only)
			const viewed = { ...app, timestamp: Date.now() };
			setRecentlyViewed((prev) => [...prev, viewed]);

			setTimeout(() => {
				setRecentlyViewed((current) => current.filter((a) => a.id !== app.id));
			}, RECENTLY_VIEWED_EXPIRY);

			// ✅ Navigate
			navigate(`/dashboard/application/${app.id}`);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Bell Icon */}
			<button
				onClick={handleToggle}
				className="relative p-2 rounded-full hover:bg-gray-100 transition"
			>
				<Bell size={22} className="text-gray-600 hover:text-indigo-600" />
				{unreadCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
						{unreadCount}
					</span>
				)}
			</button>

			{/* Dropdown */}
			{open && (
				<div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border overflow-hidden z-50">
					<div className="p-3 font-semibold text-gray-700 border-b">
						Notifications
					</div>
					<div className="max-h-64 overflow-y-auto">
						{applications.length > 0 ? (
							applications.map((app) => (
								<div
									key={app.id}
									onClick={() => handleClickNotification(app)}
									className="px-4 py-2 text-sm cursor-pointer hover:bg-indigo-100 transition text-gray-700 bg-indigo-50"
								>
									📩 {app.name || "New Application"} submitted
								</div>
							))
						) : (
							<div className="px-4 py-3 text-sm text-gray-500 text-center">
								No new applications
							</div>
						)}
					</div>

					{/* Recently Viewed Section */}
					{recentlyViewed.length > 0 && (
						<>
							<div className="p-2 font-semibold text-gray-600 border-t bg-gray-50">
								Recently Viewed
							</div>
							<div className="max-h-40 overflow-y-auto">
								{recentlyViewed.map((app) => (
									<div
										key={app.id}
										className="px-4 py-2 text-sm text-gray-500 cursor-default"
									>
										✅ {app.name || "Application"} viewed
									</div>
								))}
							</div>
						</>
					)}

					<div className="p-2 text-center border-t">
						<Link
							to="/dashboard/newapplication"
							className="text-indigo-600 text-sm text-decoration-none"
						>
							View All Applications
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

const Dashboard = () => {
	const navigate = useNavigate();
	axios.defaults.withCredentials = true;

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [contractOpen, setContractOpen] = useState(false);

	const handleLogout = () => {
		axios.get("http://localhost:3000/auth/logout").then((result) => {
			if (result.data.Status) {
				localStorage.removeItem("adminValid");
				localStorage.removeItem("adminName");
				navigate("/");
			}
		});
	};

	return (
		<div className="flex h-screen bg-gray-100 overflow-x-hidden">
			{/* Sidebar */}
			<div
				className={`fixed md:static inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
					} md:translate-x-0 md:w-64 w-64 bg-white shadow-xl transition-transform duration-300 z-50 flex flex-col`}
			>
				{/* Brand */}
				<div className="flex items-center justify-between px-16 py-3 border-b">
					<h1 className="text-xl font-extrabold text-indigo-600 tracking-wide">
						Admin
					</h1>
					<button
						onClick={() => setSidebarOpen(false)}
						className="md:hidden p-2 rounded-lg hover:bg-gray-100"
					>
						<X size={22} />
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto px-2 py-6 space-y-2">
					<Link
						to="/dashboard"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-indigo-600 bg-indigo-50 font-medium hover:bg-indigo-100 transition text-decoration-none"
					>
						<LayoutDashboard size={20} />
						<span className="ml-3">Dashboard</span>
					</Link>

					<Link
						to="/dashboard/subscriber"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-decoration-none"
					>
						<Users size={20} />
						<span className="ml-3">Manage Subs</span>
					</Link>

					<Link
						to="/dashboard/newapplication"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-decoration-none"
					>
						<FilePlus2 size={20} />
						<span className="ml-3">New Application</span>
					</Link>

					<Link
						to="/dashboard/category"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-decoration-none"
					>
						<FolderKanban size={20} />
						<span className="ml-3">Category</span>
					</Link>


					<div>
						{/* Main link (acts like dropdown toggle) */}
						<Link
							to="#"
							onClick={(e) => {
								e.preventDefault(); // prevent "#" navigation
								setContractOpen((prev) => !prev);
							}}
							className={`flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 text-decoration-none transition ${contractOpen ? "bg-indigo-50 text-indigo-600" : ""
								}`}
						>
							<span className="flex items-center ">
								<FolderKanban size={20} />
								<span className="ml-3  ">Contract & Letter</span>
							</span>
							<span className="text-xs">{contractOpen ? "▾" : "▸"}</span>
						</Link>

						{/* Dropdown submenu */}
						<div
							className={`ml-9 mt-1 flex flex-col space-y-1 overflow-hidden transition-all duration-300 ${contractOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
								}`}
						>
							<Link
								to="/dashboard/contractform"
								onClick={() => setSidebarOpen(false)}
								className="text-gray-600 hover:text-indigo-600 text-sm py-1 transition text-decoration-none"
							>
								📄 Letter
							</Link>

							<Link
								to="/dashboard/terminationletter"
								onClick={() => setSidebarOpen(false)}
								className="text-gray-600 hover:text-indigo-600 text-sm py-1 transition text-decoration-none"
							>
								✉️ Termination Letter
							</Link>

							<Link
								to="/dashboard/addendum"
								onClick={() => setSidebarOpen(false)}
								className="text-gray-600 hover:text-indigo-600 text-sm py-1 transition text-decoration-none"
							>
								📝 Addendum
							</Link>
						</div>
					</div>

					<Link
						to="/dashboard/plancalculator"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-decoration-none"
					>
						<Calculator size={20} />
						<span className="ml-3">Plan Calculator</span>
					</Link>

					{/* <Link
						to="/dashboard/summary"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-decoration-none"
					>
						<BarChart3 size={20} />
						<span className="ml-3">Subscriber Summary</span>
					</Link> */}

					<Link
						to="/dashboard/profile"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-decoration-none"
					>
						<UserCircle size={20} />
						<span className="ml-3">Profile</span>
					</Link>

					<Link
						to="/dashboard/settings"
						onClick={() => setSidebarOpen(false)}
						className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition text-decoration-none"
					>
						<Settings size={20} />
						<span className="ml-3">Settings</span>
					</Link>
				</nav>

				{/* Logout Button */}
				<div className="border-t px-4 py-4">
					<button
						onClick={() => {
							handleLogout();
							setSidebarOpen(false);
						}}
						className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
					>
						<LogOut size={18} />
						Logout
					</button>
				</div>
			</div>

			{/* Overlay (Mobile only) */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
					onClick={() => setSidebarOpen(false)}
				></div>
			)}

			{/* Main Content */}
			<main className="flex-1 flex flex-col w-full">
				{/* Header */}
				<header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white shadow-md">
					<div className="flex items-center space-x-3 flex-1">
						<button
							onClick={() => setSidebarOpen(true)}
							className="md:hidden p-2 rounded-lg hover:bg-gray-100"
						>
							<Menu size={22} />
						</button>
						<input
							type="text"
							placeholder="Search..."
							className="px-3 py-2 border rounded-lg w-full max-w-[12rem] sm:max-w-[16rem] md:max-w-[20rem] focus:outline-none focus:ring-2 focus:ring-indigo-300"
						/>
					</div>
					<div className="flex items-center space-x-4">
						<NotificationBell />
						<img
							src="https://i.pravatar.cc/40"
							alt="Profile"
							className="w-10 h-10 rounded-full border-2 border-indigo-300"
						/>
					</div>
				</header>

				{/* Outlet for nested routes */}
				<div className="p-4 sm:p-6 overflow-y-auto w-full">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
