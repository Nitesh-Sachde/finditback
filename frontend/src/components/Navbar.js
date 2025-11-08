import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Compass,
} from "lucide-react";
import { getInitials } from "../utils/helpers";

const Navbar = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                FindItBack
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {currentUser && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive("/")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <Link
                to="/search"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive("/search")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>

              <Link
                to="/matches"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive("/matches")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <Compass className="h-5 w-5" />
                <span>Matches</span>
              </Link>

              <Link
                to="/post"
                className="flex items-center space-x-1 btn btn-primary"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Post Item</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {userProfile?.profilePic ? (
                    <img
                      src={userProfile.profilePic}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border-2 border-primary-200"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                      {getInitials(
                        userProfile?.name || currentUser?.displayName
                      )}
                    </div>
                  )}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 animate-fade-in">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {currentUser && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && currentUser && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isActive("/")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isActive("/search")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Link>
            <Link
              to="/matches"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isActive("/matches")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Compass className="h-5 w-5" />
              <span>Matches</span>
            </Link>
            <Link
              to="/post"
              className="flex items-center space-x-2 btn btn-primary w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Post Item</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
