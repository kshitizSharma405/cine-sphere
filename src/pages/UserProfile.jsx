import React, { useState } from "react";

const UserProfile = () => {
  // Placeholder data for user profile
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "https://via.placeholder.com/150",
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>

      {/* Profile Picture and Info */}
      <div className="flex items-center space-x-6">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-indigo-600"
        />
        <div>
          <h3 className="text-2xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300"
          onClick={() => alert("Edit Profile feature coming soon!")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
