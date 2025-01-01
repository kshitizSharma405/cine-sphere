import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [scaleUp, setScaleUp] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsReturningUser(true);
      setTimeout(() => {
        setFadeOut(true);
        setScaleUp(true);
      }, 500); // Shortened delay before fading out and scaling up
    } else {
      setIsReturningUser(false);
    }
  }, []);

  useEffect(() => {
    if (fadeOut && scaleUp) {
      const navigateTimer = setTimeout(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
          navigate("/profile");
        } else {
          navigate("/form");
        }
      }, 1500); // After 1.5s to let the scaling and fading happen

      return () => clearTimeout(navigateTimer);
    }
  }, [fadeOut, scaleUp, navigate]);

  const handleStart = () => {
    setFadeOut(true);
    setScaleUp(true);
  };

  return (
    <div
      className={`bg-black text-yellow-500 min-h-screen flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1
        className={`pb-10 text-5xl sm:text-4xl md:text-5xl font-bold mb-4 transition-all duration-2000 ${
          scaleUp ? "transform scale-150 opacity-0" : ""
        }`}
      >
        Welcome to Cine Spheres
      </h1>
      {!isReturningUser && (
        <button
          onClick={handleStart}
          className="absolute sm:right-10 sm:bottom-1/2 sm:w-16 sm:h-16 sm:flex sm:items-center sm:justify-center sm:rounded-full sm:bg-yellow-500 sm:text-black sm:hover:bg-black sm:hover:text-yellow-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default LandingPage;
