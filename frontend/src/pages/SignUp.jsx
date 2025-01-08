import React, { useState, useRef, useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaUser,
  FaEnvelope,
  FaLock,
  FaInfo,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Api from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const interests = [
  "Adventure",
  "Cultural",
  "Beach",
  "Mountains",
  "City Breaks",
  "Food & Cuisine",
  "Wildlife",
  "Historical",
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    selectedInterests: [],
    otherInterest: "",
  });
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestChange = (interest) => {
    if (!formData.selectedInterests.includes(interest)) {
      setFormData({
        ...formData,
        selectedInterests: [...formData.selectedInterests, interest],
      });
    }
  };

  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      selectedInterests: formData.selectedInterests.filter(
        (i) => i !== interest
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password == formData.confirmPassword) {
      const dataResponse = await fetch(Api.signUp.url, {
        method: Api.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(dataResponse);
      const data = await dataResponse.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
      if (data.error) {
        toast.error(data.message);
        // navigate("/login");
      }
    } else {
      toast.error("Password and Confirm Password unmatched");
    }
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f5f7] flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-3xl flex shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] rounded-2xl overflow-hidden">
        <div className="w-3/5 bg-white p-6">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl mb-4 text-center">
              Create Account
            </h1>

            <div className="flex justify-center gap-4 mb-4">
              {[
                { icon: FaFacebookF, color: "text-[#333]" },
                { icon: FcGoogle, color: "" },
                { icon: FaLinkedinIn, color: "text-[#333]" },
              ].map((social, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="border border-gray-200 hover:border-gray-300 rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
                >
                  <social.icon className={`w-4 h-4 ${social.color}`} />
                </button>
              ))}
            </div>

            <span className="text-xs mb-4 text-center">
              or use email for registration
            </span>

            <div className="space-y-3 mb-4">
              {[
                {
                  icon: FaUser,
                  name: "username",
                  type: "text",
                  placeholder: "Username",
                },
                {
                  icon: FaEnvelope,
                  name: "email",
                  type: "email",
                  placeholder: "Email",
                },
                {
                  icon: FaLock,
                  name: "password",
                  type: "password",
                  placeholder: "Password",
                },
                {
                  icon: FaLock,
                  name: "confirmPassword",
                  type: "password",
                  placeholder: "confirmPassword",
                },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <field.icon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#eee] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-full px-3 py-2 bg-[#eee] rounded-lg cursor-pointer flex items-center justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-sm text-gray-600">
                    {formData.selectedInterests.length === 0
                      ? "Select your interests"
                      : `${formData.selectedInterests.length} selected`}
                  </span>
                  <FaChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {interests.map((interest) => (
                      <div
                        key={interest}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                          formData.selectedInterests.includes(interest)
                            ? "text-[#ff4b2b]"
                            : ""
                        }`}
                        onClick={() => {
                          handleInterestChange(interest);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Interests Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.selectedInterests.map((interest) => (
                    <div
                      key={interest}
                      className="bg-[#ff4b2b] text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {interest}
                      <FaTimes
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeInterest(interest)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mb-4">
              <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                <FaInfo className="h-4 w-4 text-gray-400" />
              </div>
              <textarea
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
                rows="2"
                className="w-full pl-10 pr-4 py-2.5 bg-[#eee] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent transition-all resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="border border-[#ff4b2b] bg-[#ff4b2b] text-white font-bold py-2.5 px-10 rounded-full uppercase tracking-wider hover:bg-[#ff416c] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] self-center text-sm"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="w-2/5 bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] p-8 flex flex-col justify-center items-center text-white">
          <h1 className="font-bold text-3xl mb-6">Welcome!</h1>
          <p className="text-lg text-center mb-8 leading-relaxed">
            Discover your perfect travel experiences
          </p>
          <p className="text-center mb-6 text-white/90">
            Join our community of adventurers and explorers
          </p>
          <div className="text-sm text-white/80 mb-4">
            Already have an account?
          </div>
          <button
            onClick={() => (window.location.href = "/login")}
            className="border-2 border-white bg-transparent text-white font-bold py-2 px-8 rounded-full uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
