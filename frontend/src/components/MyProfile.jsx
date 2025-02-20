// MyProfile.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const user = useSelector((state) => state?.user?.user);
  const [isEditing, setIsEditing] = useState(false);
  console.log(user);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start space-x-6">
          {/* Profile Image */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-3xl text-gray-400">
              {user?.username?.[0]?.toUpperCase()}
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-medium text-gray-900 mb-1">
                  {user?.username}
                </h1>
                <p className="text-gray-500 mb-2">{user?.email}</p>
                <p className="text-gray-600 max-w-2xl">{user?.bio}</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  Follow
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="border-t border-b border-gray-200 py-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Joined</p>
            <p className="font-medium">{formatDate(user?.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-medium capitalize">{user?.role}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Interests</p>
            <p className="font-medium">{user?.interests?.length || 0}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Collections</p>
            <p className="font-medium">3</p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="space-y-8">
        {/* Saved Destinations */}
        <div>
          <h2 className="text-xl font-medium mb-4">Saved Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.savedDestinations?.length > 0 ? (
              user.savedDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  {/* Placeholder for destination image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Destination {index + 1}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No saved destinations yet</p>
            )}
          </div>
        </div>

        {/* Posted Destinations */}
        <div>
          <h2 className="text-xl font-medium mb-4">Posted Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.trips?.length > 0 ? (
              user.trips.map((trip, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  {/* Placeholder for trip image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Trip {index + 1}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posted trips yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
