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

    hobby: "",

    favoriteSport: "",

    favoriteSeason: "",
    favoriteCity: "",
    dreamJob: "",
    favoriteColor: "",
    lifeMotto: "",
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

        hobby: "",

        favoriteSport: "",

        favoriteSeason: "",
        favoriteCity: "",
        dreamJob: "",
        favoriteColor: "",
        lifeMotto: "",
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
        className="p-8 rounded-lg shadow-lg w-full max-w-7xl relative"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))", // Added gradient for form overlay
          backdropFilter: "blur(2px)", // Apply blur effect to background
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)", // Adding shadow for 3D effect
        }}
      >
        <h2 className="text-red-500 text-2xl font-bold mb-6 text-center">
          Tell Us About Yourself
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name and Email */}
          <div className="grid grid-cols-2 gap-6">
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

          {/* Favorite Movie, Actor and genre */}
          <div className="grid grid-cols-3 gap-4">
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
          </div>

          {/* Favorite color, Favorite Music and Book */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="favoriteColor"
                className="block text-white text-sm font-medium"
              >
                Favorite Color
              </label>
              <input
                type="text"
                id="favoriteColor"
                name="favoriteColor"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteColor}
              />
            </div>
            <div>
              <label
                htmlFor="favoriteMusic"
                className="block text-white text-sm font-medium"
              >
                Favorite Music
              </label>
              <input
                type="text"
                id="favoriteMusic"
                name="favoriteMusic"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteMusic}
              />
            </div>
            <div>
              <label
                htmlFor="favoriteBook"
                className="block text-white text-sm font-medium"
              >
                Favorite Book
              </label>
              <input
                type="text"
                id="favoriteBook"
                name="favoriteBook"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData?.favoriteBook}
              />
            </div>
          </div>

          {/* Favorite Food, Hobby and Dream vacation */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="favoriteFood"
                className="block text-white text-sm font-medium"
              >
                Favorite Food
              </label>
              <input
                type="text"
                id="favoriteFood"
                name="favoriteFood"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteFood}
              />
            </div>
            <div>
              <label
                htmlFor="hobby"
                className="block text-white text-sm font-medium"
              >
                Hobby
              </label>
              <input
                type="text"
                id="hobby"
                name="hobby"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.hobby}
              />
            </div>
            <div>
              <label
                htmlFor="dreamVacation"
                className="block text-white text-sm font-medium"
              >
                Dream Vacation
              </label>
              <input
                type="text"
                id="dreamVacation"
                name="dreamVacation"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.dreamVacation}
              />
            </div>
          </div>

          {/* Favorite Sport, Pet Name and Favorite Season */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="favoriteSport"
                className="block text-white text-sm font-medium"
              >
                Favorite Sport
              </label>
              <input
                type="text"
                id="favoriteSport"
                name="favoriteSport"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteSport}
              />
            </div>
            <div>
              <label
                htmlFor="petName"
                className="block text-white text-sm font-medium"
              >
                Pet Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.petName}
              />
            </div>
            <div>
              <label
                htmlFor="favoriteSeason"
                className="block text-white text-sm font-medium"
              >
                Favorite Season
              </label>
              <input
                type="text"
                id="favoriteSeason"
                name="favoriteSeason"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteSeason}
              />
            </div>
          </div>

          {/* Favorite City and Dream Job */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="favoriteCity"
                className="block text-white text-sm font-medium"
              >
                Favorite City
              </label>
              <input
                type="text"
                id="favoriteCity"
                name="favoriteCity"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.favoriteCity}
              />
            </div>
            <div>
              <label
                htmlFor="dreamJob"
                className="block text-white text-sm font-medium"
              >
                Dream Job
              </label>
              <input
                type="text"
                id="dreamJob"
                name="dreamJob"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.dreamJob}
              />
            </div>
            <div>
              <label
                htmlFor="lifeMotto"
                className="block text-white text-sm font-medium"
              >
                Life Motto
              </label>
              <input
                type="text"
                id="lifeMotto"
                name="lifeMotto"
                className="mt-1 p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
                onChange={handleChange}
                value={formData.lifeMotto}
              />
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
          <div className="flex flex-col align-middle">
            <label
              htmlFor="bio"
              className="text-center p-2 text-white text-sm font-medium"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className=" p-3 w-full bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition-all"
              onChange={handleChange}
              value={formData.bio}
            ></textarea>
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
