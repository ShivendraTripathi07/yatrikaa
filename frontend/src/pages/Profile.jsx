// Profile.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AllUsers from "../components/AllUsers";
import MyProfile from "../components/MyProfile";
import Header from "../components/Header";
import AllGuides from "../components/AllGuides";

import GuidesAccept from "../components/GuidesAccept";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <Routes>
        <Route
          index
          element={
            <div className="space-y-6">
              {user?.role?.toLowerCase() === "admin" && <AllUsers />}
              <Link
                to="myprofile"
                className="block w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  My Profile
                </h2>
                <p className="text-gray-600">
                  View and manage your personal information
                </p>
              </Link>
            </div>
          }
        />
        <Route path="myprofile" element={<MyProfile />} />
      </Routes>
      <AllGuides />
      <GuidesAccept />
    </div>
  );
};

export default Profile;
