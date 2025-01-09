import React, { useContext, useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Api from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetail } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(Api.login.url, {
      method: Api.login.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(dataResponse);
    const dataApi = await dataResponse.json();
    // console.log(dataApi);
    if (dataApi.success) {
      // console.log(dataApi);
      toast.success("Login Successful");
      navigate("/");
      fetchUserDetail();
    } else {
      toast.error("Login Unsuccessful");
    }
  };
  // useEffect()

  return (
    <div className="min-h-screen bg-[#f6f5f7] flex justify-center items-center py-12 px-4">
      <div
        className={`container relative bg-white rounded-2xl shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] overflow-hidden w-full max-w-4xl min-h-[580px] ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 
          ${isRightPanelActive ? "translate-x-full" : ""}`}
        >
          <form
            className="bg-white flex items-center justify-center flex-col px-12 h-full text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-3xl mb-6">Sign in</h1>
            <div className="flex gap-6 my-6">
              <button className="border border-gray-200 hover:border-gray-300 rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-sm hover:shadow-md">
                <FaFacebookF className="w-5 h-5 text-[#333]" />
              </button>
              <button className="border border-gray-200 hover:border-gray-300 rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-sm hover:shadow-md">
                <FcGoogle className="w-6 h-6" />
              </button>
              <button className="border border-gray-200 hover:border-gray-300 rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-sm hover:shadow-md">
                <FaLinkedinIn className="w-5 h-5 text-[#333]" />
              </button>
            </div>
            <span className="text-sm mb-6">or use your account</span>
            <div className="w-full space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-[#eee] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-[#eee] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                />
              </div>
            </div>
            <a
              href="#"
              className="text-[#333] text-sm hover:text-[#ff4b2b] mt-4 transition-colors"
            >
              Forgot your password?
            </a>
            <button
              type="submit"
              className="mt-8 border border-[#ff4b2b] bg-[#ff4b2b] text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-[#ff416c] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition transform duration-600 ease-in-out z-100 
          ${isRightPanelActive ? "-translate-x-full" : ""}`}
        >
          <div
            className={`bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out 
            ${isRightPanelActive ? "translate-x-1/2" : ""}`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-12 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out -translate-x-[20%] 
              ${isRightPanelActive ? "translate-x-0" : ""}`}
            >
              <h1 className="font-bold text-3xl mb-4">Welcome Back!</h1>
              <p className="text-lg mb-6">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setIsRightPanelActive(false)}
                className="border-2 border-white bg-transparent text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-12 text-center top-0 right-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out 
              ${isRightPanelActive ? "translate-x-[20%]" : ""}`}
            >
              <h1 className="font-bold text-3xl mb-4">Hello, Friend!</h1>
              <p className="text-lg mb-6">
                Enter your personal details and start journey with us
              </p>
              <Link
                to={"/signup"}
                onClick={() => setIsRightPanelActive(true)}
                className="border-2 border-white bg-transparent text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
