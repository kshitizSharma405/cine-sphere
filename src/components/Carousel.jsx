import React, { useEffect, useState } from "react";
import { fetchMoviesBySearch } from "../utils/api";

const Carousel = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadTopMovies = async () => {
      try {
        const data = await fetchMoviesBySearch("top", 1);
        setTopMovies(data.slice(0, 5)); // Display only 5 movies in the carousel
      } catch (err) {
        console.error("Failed to fetch top movies:", err.message);
      }
    };
    loadTopMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topMovies.length);
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, [topMovies.length]);

  if (!topMovies.length) return null;

  return (
    <div className="relative w-full h-72 overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg">
      {topMovies.map((movie, index) => (
        <div
          key={movie.imdbID}
          className={`absolute inset-0 transition-transform duration-700 ${
            index === currentIndex ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300"
            }
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
            <h3 className="text-white text-xl font-bold">{movie.Title}</h3>
            <p className="text-gray-200">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
