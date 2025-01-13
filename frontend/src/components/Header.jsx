import React, { useState, useEffect, useContext } from "react";
import {
  Menu,
  X,
  Home,
  MapPin,
  User,
  Heart,
  Briefcase,
  Search,
  LogOut,
  Map,
  Navigation,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../common";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(Api.logout_user.url, {
        method: Api.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const navItems = [
    { name: "Property", icon: Home, path: "/property" },
    { name: "MyTrips", icon: MapPin, path: "/my-trips" },
    { name: "destinations", icon: Heart, path: "/destinations" },
  ];

  const userMenuItems = [
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Destinations", icon: Map, path: "/destinations" },
    { name: "Travel", icon: Navigation, path: "/travel" },
    { name: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  const renderUserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full 
          transition-all duration-300 
          ${
            isScrolled
              ? "text-gray-800 hover:bg-purple-50"
              : "text-white hover:bg-white/10"
          }`}
      >
        <User className="w-5 h-5" />
        <span className="font-medium">
          {user?.username
            ? user.username.length > 10
              ? `${user.username.slice(0, 10)}...`
              : user.username
            : "Guest"}
        </span>
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50">
          {userMenuItems.map((item) =>
            item.onClick ? (
              <button
                key={item.name}
                onClick={() => {
                  item.onClick();
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-purple-50 text-gray-700"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-purple-50 text-gray-700"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 
        ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group relative">
            <h1
              className={`text-4xl font-bold text-white ${
                isScrolled ? "bg-gradient-to-r from-purple-600 to-blue-500" : ""
              } bg-clip-text ${isScrolled ? "text-transparent" : ""} 
              transition-all duration-300 group-hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
            >
              Yatrikaa
            </h1>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search destinations..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 
                         text-white placeholder-white/70 focus:outline-none focus:bg-white/20 
                         transition-all duration-300 w-48 focus:w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-full 
                  transition-all duration-300 group 
                  ${
                    isScrolled
                      ? "text-gray-800 hover:bg-purple-50"
                      : "text-white hover:bg-white/10"
                  }`}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <item.icon
                  className={`w-5 h-5 transition-all duration-300 
                  ${
                    activeItem === item.name ? "scale-110 text-purple-500" : ""
                  }`}
                />
                <span className="font-medium">{item.name}</span>
                {activeItem === item.name && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-500"></div>
                )}
              </Link>
            ))}
            {user ? (
              renderUserMenu()
            ) : (
              <Link
                to="/login"
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                  ${
                    isScrolled
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors duration-300 
              ${isScrolled ? "text-gray-800" : "text-white"} 
              hover:bg-white/10`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="absolute left-4 right-4 p-4 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200
                             text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-500
                             transition-all duration-300"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700
                    hover:bg-purple-50 transition-all duration-300 relative overflow-hidden group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative z-10 flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div
                    className="absolute inset-0 w-0 bg-gradient-to-r from-purple-50 to-blue-50 
                    transition-all duration-300 group-hover:w-full"
                  ></div>
                </Link>
              ))}
              {user ? (
                userMenuItems.map((item) =>
                  item.onClick ? (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.onClick();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-xl text-gray-700
                        hover:bg-purple-50 transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="relative z-10 flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700
                        hover:bg-purple-50 transition-all duration-300 relative overflow-hidden group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="relative z-10 flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">
                          {user?.username
                            ? user.username.length > 10
                              ? `${user.username.slice(0, 10)}...`
                              : user.username
                            : "Guest"}
                        </span>
                      </div>
                      <div
                        className="absolute inset-0 w-0 bg-gradient-to-r from-purple-50 to-blue-50 
                        transition-all duration-300 group-hover:w-full"
                      ></div>
                    </Link>
                  )
                )
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white
                    bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
