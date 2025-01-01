import React, { useState, useEffect, useRef } from "react";
import { fetchMoviesBySearch } from "../utils/api";
import FilmCard from "../components/FilmCard";
import Carousel from "../components/Carousel";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const observer = useRef(null);
  const loadingRef = useRef(null);

  // State to manage likes, comments, and ratings
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMoviesBySearch("avengers", page);
        setMovies((prev) => [...prev, ...data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    observer.current = new IntersectionObserver(handleObserver, options);
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }
    return () => observer.current.disconnect();
  }, [loading, handleObserver]);

  const handleLike = (movieId) => {
    setMovieDetails((prevDetails) => {
      const updatedMovies = { ...prevDetails };
      updatedMovies[movieId] = {
        ...updatedMovies[movieId],
        likes: (updatedMovies[movieId]?.likes || 0) + 1,
      };
      return updatedMovies;
    });
  };

  const handleComment = (movieId, comment) => {
    setMovieDetails((prevDetails) => {
      const updatedMovies = { ...prevDetails };
      updatedMovies[movieId] = {
        ...updatedMovies[movieId],
        comments: [...(updatedMovies[movieId]?.comments || []), comment],
      };
      return updatedMovies;
    });
  };

  const handleRating = (movieId, rating) => {
    setMovieDetails((prevDetails) => {
      const updatedMovies = { ...prevDetails };
      updatedMovies[movieId] = {
        ...updatedMovies[movieId],
        rating,
      };
      return updatedMovies;
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Popular Movies</h2>
      <div className="m-4">
        <Carousel />
      </div>
      {/* Movie List - Only 1 Post per Row, Centralized */}
      <div className="grid grid-rows-1 justify-center gap-6">
        {movies.map((movie, index) => (
          <FilmCard
            key={movie.imdbID + index}
            title={movie.Title}
            poster={movie.Poster}
            year={movie.Year}
            likes={movieDetails[movie.imdbID]?.likes || 0}
            comments={movieDetails[movie.imdbID]?.comments || []}
            rating={movieDetails[movie.imdbID]?.rating || 0}
            onLike={() => handleLike(movie.imdbID)}
            onComment={(comment) => handleComment(movie.imdbID, comment)}
            onRating={(rating) => handleRating(movie.imdbID, rating)}
          />
        ))}
      </div>
      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading more movies...</p>}
      {/* Lazy Loading Trigger */}
      <div ref={loadingRef} className="text-center p-4">
        {loading ? <p>Loading...</p> : <p>Scroll down to load more...</p>}
      </div>
      {/* Error Handling */}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Home;
