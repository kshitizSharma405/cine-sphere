import React, { useState } from "react";

const FilmCard = ({
  title,
  poster,
  year,
  likes,
  comments,
  rating,
  onLike,
  onComment,
  onRating,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleLike = () => onLike();
  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleAddComment = () => {
    if (newComment) {
      onComment(newComment);
      setNewComment("");
    }
  };
  const handleRating = (value) => onRating(value);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:text-white mb-6">
      <img
        src={poster !== "N/A" ? poster : "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-64 object-cover md:h-80 lg:h-64"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">Year: {year}</p>

        {/* Like, Comment, Rating Section */}
        <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-x-4">
          <button
            className="text-blue-500 dark:text-blue-400"
            onClick={handleLike}
          >
            ❤️ Like ({likes})
          </button>

          <div className="flex items-center space-x-1">
            <p className="mr-2">Rating: </p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-yellow-500 ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-4">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            className="border p-2 rounded-md w-full dark:bg-gray-700 dark:text-white"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Comment
          </button>

          <div className="mt-4">
            {comments.length > 0 && (
              <ul className="space-y-2">
                {comments.map((comment, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {comment}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
