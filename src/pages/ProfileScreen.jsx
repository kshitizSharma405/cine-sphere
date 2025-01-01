import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();

  // Fetch the saved user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 text-white animate-fade-in">
        <h1 className="text-3xl animate-pulse">
          No user data found. Please fill out the form first.
        </h1>
      </div>
    );
  }

  const {
    name,
    email,
    favoriteMovie,
    favoriteActor,
    genre,
    bio,
    profilePicture,
    coverPhoto,
  } = userData;

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("userData");
    // Redirect to the landing page (or another desired page)
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
      {/* Main Content */}
      <div>
        {/* Header Section with Logout Button */}
        <div className="flex justify-between items-center p-6">
          <h1 className="text-4xl font-bold text-white">{name}'s Profile</h1>
          <button
            onClick={handleLogout}
            className="w-32 h-12 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-400 transform transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Cover Photo Section */}
        <div
          className="relative h-72 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
          style={{
            backgroundImage: coverPhoto
              ? `url(${coverPhoto})`
              : 'url("/default-cover.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Profile Picture */}
          <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl z-30">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="m-10 py-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl mx-4 md:mx-36 space-y-10 transform transition duration-500 hover:shadow-3xl hover:scale-105">
          {/* Name and Email in one line */}
          <div className="text-center space-y-4 flex flex-wrap justify-center items-center">
            <h1 className="text-5xl font-bold text-gray-800 tracking-wider drop-shadow-lg animate-fade-in">
              {name}
            </h1>
            <p className="text-xl font-medium text-gray-600 mx-4 animate-slide-in-right">
              {email}
            </p>
          </div>

          <div className="py-8 px-6 md:px-24 space-y-10">
            {/* About Section */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800 drop-shadow-lg">
                About
              </h2>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                <p className="text-lg text-gray-800 tracking-wide leading-relaxed break-words">
                  {bio}
                </p>
              </div>
            </div>

            {/* Favorite Movie and Actor in one line */}
            <div className="mt-6 flex flex-wrap space-x-4 animate-slide-in-left">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                <h2 className="text-3xl font-semibold mb-2 text-gray-800 drop-shadow-lg">
                  Favorite Movie
                </h2>
                <p className="text-lg text-gray-700">{favoriteMovie}</p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                <h2 className="text-3xl font-semibold mb-2 text-gray-800 drop-shadow-lg">
                  Favorite Actor
                </h2>
                <p className="text-lg text-gray-700">{favoriteActor}</p>
              </div>
            </div>

            {/* Favorite Genre in separate section */}
            <div className="mt-6 animate-slide-in-left">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                <h2 className="text-3xl font-semibold mb-2 text-gray-800 drop-shadow-lg">
                  Favorite Genre
                </h2>
                <p className="text-lg text-gray-700">{genre}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-center py-4 mt-auto">
        <p className="text-gray-400 text-sm">
          &copy; 2025 Cine-Sphere. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProfileScreen;
