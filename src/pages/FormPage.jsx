import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favoriteMovie: "",
    favoriteActor: "",
    genre: "",
    bio: "",
    profilePicture: null,
    coverPhoto: null,
  });
  const navigate = useNavigate();
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Animation",
    "Documentary",
    "Biography",
  ];

  // Helper function to convert file to Base64
  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        // If file size is greater than 2MB
        alert("File size exceeds 2MB. Compressing...");

        try {
          // Image compression options to reduce size
          const options = {
            maxSizeMB: 0.5, // Set max size to 0.5MB
            maxWidthOrHeight: 1920, // Set the max dimension to 1920px (both width & height)
            useWebWorker: true,
          };

          // Compress the image
          const compressedFile = await imageCompression(files[0], options);

          // Check the compressed file size
          if (compressedFile.size > 2 * 1024 * 1024) {
            alert(
              "Compressed image is still too large. Try using a smaller image."
            );
            return;
          }

          // Convert compressed image to Base64 and store in formData
          convertToBase64(compressedFile, (base64File) => {
            setFormData((prev) => ({
              ...prev,
              [name]: base64File,
            }));
          });
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      } else {
        // If file size is under 2MB, no compression needed
        convertToBase64(files[0], (base64File) => {
          setFormData((prev) => ({
            ...prev,
            [name]: base64File,
          }));
        });
      }
    } else {
      // Handle non-file fields (text, select, etc.)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const checkStorageLimit = (data) => {
    const dataSize = new Blob([JSON.stringify(data)]).size;
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    return dataSize <= maxSize;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkStorageLimit(formData)) {
      localStorage.setItem("userData", JSON.stringify(formData));
      navigate("/profile");
      console.log("Saved Data:", formData);

      // Optionally clear form data after submission
      setFormData({
        name: "",
        email: "",
        favoriteMovie: "",
        favoriteActor: "",
        genre: "",
        bio: "",
        profilePicture: null,
        coverPhoto: null,
      });
    } else {
      alert("Data exceeds storage limit. Please optimize your inputs.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("/wp2700194-marvel-logo-wallpaper.jpg")`, // Background image remains unchanged
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-8 rounded-lg shadow-lg w-full max-w-2xl relative"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))", // Added gradient for form overlay
          backdropFilter: "blur(10px)", // Apply blur effect to background
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)", // Adding shadow for 3D effect
        }}
      >
        <h2 className="text-red-500 text-2xl font-bold mb-6 text-center">
          Tell Us About Yourself
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name and Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-white text-sm font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
          </div>

          {/* Favorite Movie and Actor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="favoriteMovie"
                className="block text-white text-sm font-medium"
              >
                Favorite Movie
              </label>
              <input
                type="text"
                id="favoriteMovie"
                name="favoriteMovie"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteMovie}
                required
              />
            </div>
            <div>
              <label
                htmlFor="favoriteActor"
                className="block text-white text-sm font-medium"
              >
                Favorite Actor
              </label>
              <input
                type="text"
                id="favoriteActor"
                name="favoriteActor"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteActor}
              />
            </div>
          </div>

          {/* Genre and Bio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="genre"
                className="block text-white text-sm font-medium"
              >
                Favorite Genre
              </label>
              <select
                id="genre"
                name="genre"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.genre}
                required
              >
                <option value="">Select a genre</option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-white text-sm font-medium"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.bio}
              ></textarea>
            </div>
          </div>

          {/* Profile Picture and Cover Photo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="profilePicture"
                className="block text-white text-sm font-medium"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="coverPhoto"
                className="block text-white text-sm font-medium"
              >
                Cover Photo
              </label>
              <input
                type="file"
                id="coverPhoto"
                name="coverPhoto"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-400 font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
