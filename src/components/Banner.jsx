import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Banner = ({ darkMode }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 py-20 px-10 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold">
        <a href="/"> CineSphere</a>
      </h1>
      <p className="mt-2 text-lg">Explore your favorite movies and more!</p>
      <div className="mt-6">
        <Link
          to="/profile"
          className="text-white text-lg font-semibold underline"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
};

export default Banner;
