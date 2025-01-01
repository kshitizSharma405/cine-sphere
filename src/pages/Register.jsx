import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Register = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    favoriteActor: "",
    favoriteMovie: "",
  });
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user data in localStorage
    localStorage.setItem("cineSphereUser", JSON.stringify(formData));

    navigate("/profile"); // Redirect to login page after registration
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-lg shadow-md w-full max-w-md ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          name="favoriteActor"
          placeholder="Favorite Actor"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="favoriteMovie"
          placeholder="Favorite Movie"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
