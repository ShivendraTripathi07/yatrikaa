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
  FaCamera,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Api from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import uploadImage from "../common/cloudinary";

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
    profilePicture: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      const uploadedImage = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: uploadedImage.url,
      }));
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
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

  const handleNext = () => {
    if (step <= 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only process form submission on the final step
    if (step !== 4) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(Api.signUp.url, {
        method: Api.signUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Welcome to our community!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ProgressBar = () => (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
      {[1, 2, 3].map((number) => (
        <div
          key={number}
          className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-sm font-medium transition-all duration-300 ${
            step === number
              ? "bg-indigo-600 text-white"
              : step > number
              ? "bg-green-500 text-white"
              : "bg-white text-gray-400 border-2 border-gray-200"
          }`}
        >
          {number}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="w-full md:w-2/3 p-8">
            <div className="max-w-lg mx-auto">
              <ProgressBar />

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">
                        Create Your Account
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Join our community of travelers
                      </p>
                    </div>

                    <div className="flex justify-center mb-8">
                      <div className="relative group">
                        <div
                          className={`w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 ${
                            isUploading ? "opacity-50" : ""
                          }`}
                        >
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <FaUser className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="absolute bottom-0 right-0 bg-indigo-600 p-3 rounded-full text-white transform translate-x-1/4 translate-y-1/4 hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
                        >
                          <FaCamera className="w-5 h-5" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

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
                        placeholder: "Email address",
                      },
                    ].map((field) => (
                      <div key={field.name} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <field.icon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                        </div>
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="block w-full pl-12 pr-4 py-3.5 text-gray-900 rounded-lg border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">
                        Security Details
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Keep your account secure
                      </p>
                    </div>

                    {[
                      {
                        icon: FaLock,
                        name: "password",
                        type: "password",
                        placeholder: "Create password",
                      },
                      {
                        icon: FaLock,
                        name: "confirmPassword",
                        type: "password",
                        placeholder: "Confirm password",
                      },
                    ].map((field) => (
                      <div key={field.name} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <field.icon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                        </div>
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="block w-full pl-12 pr-4 py-3.5 text-gray-900 rounded-lg border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">
                        Travel Preferences
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Tell us what you love
                      </p>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                      <div
                        className="w-full px-4 py-3.5 bg-white rounded-lg cursor-pointer flex items-center justify-between border border-gray-200 hover:border-indigo-600 transition-all duration-300"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className="text-gray-700">
                          {formData.selectedInterests.length === 0
                            ? "Select your travel interests"
                            : `${formData.selectedInterests.length} interests selected`}
                        </span>
                        <FaChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                            isDropdownOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </div>

                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl animate-fadeIn">
                          <div className="p-2 grid grid-cols-2 gap-1">
                            {interests.map((interest) => (
                              <div
                                key={interest}
                                className={`px-4 py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                                  formData.selectedInterests.includes(interest)
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-indigo-50"
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
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.selectedInterests.map((interest) => (
                          <div
                            key={interest}
                            className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1.5 rounded-full flex items-center gap-2 animate-fadeIn"
                          >
                            {interest}
                            <FaTimes
                              className="w-3 h-3 cursor-pointer hover:text-indigo-600 transition-colors duration-200"
                              onClick={() => removeInterest(interest)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                        <FaInfo className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        name="bio"
                        placeholder="Tell us about your travel experiences and dreams..."
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="block w-full pl-12 pr-4 py-3.5 text-gray-900 rounded-lg border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20 transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-300"
                    >
                      Back
                    </button>
                  )}

                  {step <= 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 ml-auto"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? "Creating Account..." : "Create Account"}
                    </button>
                  )}
                </div>
              </form>

              {step === 1 && (
                <div className="mt-8">
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

                  <div className="flex justify-center gap-4 mt-6">
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
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Info Panel */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 flex flex-col justify-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Join Our Community</h2>
                <p className="text-indigo-200 leading-relaxed">
                  Connect with fellow travelers, share your experiences, and
                  discover new destinations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-indigo-200">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Explore</h3>
                    <p className="text-sm">Find hidden gems worldwide</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-indigo-200">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <FaUser className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Connect</h3>
                    <p className="text-sm">Meet like-minded travelers</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-indigo-200">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <FaInfo className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Share</h3>
                    <p className="text-sm">Share your travel stories</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-indigo-500/30">
                <p className="text-indigo-200 text-sm mb-4">
                  Already have an account?
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;