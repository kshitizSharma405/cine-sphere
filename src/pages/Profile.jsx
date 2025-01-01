import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import FAQAccordion from "../components/FAQAccordion"; // Import Accordion
import { FaPen } from "react-icons/fa"; // Import pen icon

const Profile = ({ darkMode }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    likedMovies: [],
    profileImage: "",
    coverPhoto: "",
  });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [movieToLike, setMovieToLike] = useState(""); // New state for liking a movie
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch user data from localStorage
    const userDetails = JSON.parse(localStorage.getItem("cineSphereUser"));
    if (userDetails) {
      setUser({
        ...userDetails,
        likedMovies: userDetails.likedMovies || [], // Ensure likedMovies is an empty array if undefined
      });
      setNewName(userDetails.firstName + " " + userDetails.lastName);
      setNewEmail(userDetails.email);
    } else {
      navigate("/login"); // Redirect to login if no user found
    }
  }, [navigate]);

  const handleSave = () => {
    // Save updated details to localStorage
    const updatedUser = {
      ...user,
      name: newName,
      email: newEmail,
      profileImage: newProfileImage ? newProfileImage : user.profileImage,
      coverPhoto: newCoverPhoto ? newCoverPhoto : user.coverPhoto,
    };
    localStorage.setItem("cineSphereUser", JSON.stringify(updatedUser)); // Save to localStorage
    setUser(updatedUser);
    setEditing(false);
  };

  const handleCancel = () => {
    // Cancel edit and reset fields
    setNewName(user.name);
    setNewEmail(user.email);
    setEditing(false);
  };

  const handleLogout = () => {
    // Clear user data and redirect to login page
    localStorage.removeItem("cineSphereUser");
    navigate("/login");
  };

  const handleLikeMovie = (movie) => {
    // Add the liked movie to the likedMovies array
    const updatedMovies = [...user.likedMovies, movie];
    const updatedUser = { ...user, likedMovies: updatedMovies };

    // Save the updated user data to localStorage
    localStorage.setItem("cineSphereUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const MAX_WIDTH = 400; // Max width of image
          const MAX_HEIGHT = 400; // Max height of image
          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions while preserving aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas image to a base64 string
          const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // Compress the image to 70%

          setNewProfileImage(compressedImage); // Set compressed image
        };
        img.src = reader.result; // Set the base64 image source
      };
      reader.readAsDataURL(file); // Read the file as a base64 URL
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const MAX_WIDTH = 800; // Max width of image
          const MAX_HEIGHT = 800; // Max height of image
          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions while preserving aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas image to a base64 string
          const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // Compress the image to 70%

          setNewCoverPhoto(compressedImage); // Set compressed image
        };
        img.src = reader.result; // Set the base64 image source
      };
      reader.readAsDataURL(file); // Read the file as a base64 URL
    }
  };

  return (
    <div
      className={`p-6 max-w-3xl mx-auto ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>

      {/* Cover Photo */}
      <div
        className={`relative w-full h-64 mb-6 ${
          darkMode ? "bg-gray-600" : "bg-gray-300"
        }`}
        style={{
          backgroundImage: `url(${
            newCoverPhoto || user.coverPhoto || "/default-cover.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input
          id="cover-photo-input"
          type="file"
          onChange={handleCoverPhotoChange}
          accept="image/*"
          className="absolute top-0 right-0 p-2 opacity-0 cursor-pointer"
        />
        <FaPen
          className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
          onClick={() => document.getElementById("cover-photo-input").click()}
        />
      </div>

      {/* Profile Information */}
      <div
        className={`shadow-lg rounded-lg p-6 ${
          darkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-4">
          {/* Profile Image */}
          <div className="relative mr-4">
            <img
              src={
                newProfileImage || user.profileImage || "/default-profile.jpg"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
            <input
              id="profile-photo-input"
              type="file"
              onChange={handleProfileImageChange}
              accept="image/*"
              className="absolute top-0 right-0 opacity-0 cursor-pointer"
            />
            <FaPen
              className="absolute top-0 right-0 text-white text-xl cursor-pointer"
              onClick={() =>
                document.getElementById("profile-photo-input").click()
              }
            />
          </div>

          <div>
            <div className="mb-4">
              <strong>Name: </strong>
              {editing ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>

            <div className="mb-4">
              <strong>Email: </strong>
              {editing ? (
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
          </div>
        </div>

        {/* Liked Movies */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Liked Movies</h3>
          {user.likedMovies && user.likedMovies.length > 0 ? (
            <ul>
              {user.likedMovies.map((movie, index) => (
                <li key={index} className="mb-2">
                  {movie.title} ({movie.year})
                </li>
              ))}
            </ul>
          ) : (
            <p>No liked movies yet.</p>
          )}

          {/* Input for liking a new movie */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter movie title"
              value={movieToLike}
              onChange={(e) => setMovieToLike(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <button
              onClick={() => {
                if (movieToLike.trim()) {
                  handleLikeMovie({
                    title: movieToLike,
                    year: new Date().getFullYear(),
                  });
                  setMovieToLike(""); // Clear input
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              Like Movie
            </button>
          </div>
        </div>

        {/* Edit/Save Buttons */}
        <div className="mt-6 flex justify-end">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-10 w-full max-w-md">
        <FAQAccordion darkMode={darkMode} />
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
