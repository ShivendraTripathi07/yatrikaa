import React, { useContext, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Api from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetail } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(Api.login.url, {
        method: Api.login.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await response.json();

      if (dataApi.success) {
        toast.success("Welcome back!");
        navigate("/");
        fetchUserDetail();
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Info Panel */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 flex flex-col justify-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Welcome Back!</h2>
                <p className="text-indigo-200 leading-relaxed">
                  Sign in to continue your journey and explore amazing
                  destinations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-indigo-200">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <FaUser className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Personal Account
                    </h3>
                    <p className="text-sm">Access your travel profile</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-indigo-200">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Travel Updates</h3>
                    <p className="text-sm">Stay informed about your trips</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-indigo-500/30">
                <p className="text-indigo-200 text-sm mb-4">
                  New to our platform?
                </p>
                <Link
                  to="/signup"
                  className="block w-full px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg text-center hover:bg-indigo-50 transition-all duration-300"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-2/3 p-8">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
                <p className="mt-2 text-gray-600">
                  Welcome back to your travel community
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={data.email}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3.5 text-gray-900 rounded-lg border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20 transition-all duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={data.password}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3.5 text-gray-900 rounded-lg border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>

                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  {[
                    { icon: FaFacebookF, color: "bg-[#1877f2]" },
                    {
                      icon: FcGoogle,
                      color: "bg-white border border-gray-200",
                    },
                    { icon: FaLinkedinIn, color: "bg-[#0077b5]" },
                  ].map((social, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${social.color} w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
                    >
                      <social.icon
                        className={`w-5 h-5 ${
                          social.icon === FcGoogle ? "" : "text-white"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </form>

              <div className="mt-8 text-center text-sm text-gray-600">
                <span>Don't have an account? </span>
                <Link
                  to="/signup"
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                >
                  Create one now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
