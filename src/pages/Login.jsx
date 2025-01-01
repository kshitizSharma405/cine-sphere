import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Login = ({ darkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in (if user data exists in localStorage)
    const storedUser = localStorage.getItem("cineSphereUser");
    if (storedUser) {
      navigate("/profile"); // If logged in, redirect to profile page
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("cineSphereUser"));

    if (storedUser) {
      // Check if the entered credentials match the stored data
      if (storedUser.email === email && storedUser.password === password) {
        navigate("/profile"); // Redirect to profile page on successful login
      } else {
        setError("Incorrect email or password");
      }
    } else {
      setError("No user found. Please register first.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={handleLogin}
        className={`p-6 rounded-lg shadow-md w-full max-w-md ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded"
        >
          Login
        </button>

        <div className="mt-4">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
