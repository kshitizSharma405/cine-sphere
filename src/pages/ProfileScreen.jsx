// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ProfileScreen = () => {
//   const navigate = useNavigate();

//   // Fetch the saved user data and form answers from localStorage
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const formData = JSON.parse(localStorage.getItem("formData"));

//   if (!userData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 text-white animate-fade-in">
//         <h1 className="text-3xl animate-pulse">
//           No user data found. Please fill out the form first.
//         </h1>
//       </div>
//     );
//   }

//   const {
//     name,
//     email,
//     favoriteMovie,
//     favoriteActor,
//     genre,
//     bio,
//     profilePicture,
//     coverPhoto,
//   } = userData;

//   const handleLogout = () => {
//     // Remove user data from localStorage
//     localStorage.removeItem("userData");
//     localStorage.removeItem("formData"); // Optionally clear form data
//     // Redirect to the landing page (or another desired page)
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
//       {/* Main Content */}
//       <div>
//         {/* Header Section with Logout Button */}
//         <div className="flex justify-between items-center p-6">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
//             {name}'s Profile
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="w-32 h-12 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-400 transform transition-all duration-300"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Cover Photo Section */}
//         <div
//           className="m-4 relative h-48 sm:h-60 md:h-72 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
//           style={{
//             backgroundImage: coverPhoto
//               ? `url(${coverPhoto})`
//               : 'url("/default-cover.jpg")',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {/* Profile Picture with Bouncing Animation */}
//           <div className="absolute bottom-[-55px] left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-32 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-bounce">
//             <img
//               src={profilePicture}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Profile Info Section */}
//         <div className="m-6 sm:m-10 py-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl mx-4 sm:mx-8 md:mx-36 space-y-8 sm:space-y-10">
//           {/* Name and Email in one line */}
//           <div className="text-center space-y-4 flex flex-wrap justify-center items-center">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 tracking-wider drop-shadow-lg animate-fade-in">
//               {name}
//             </h1>
//             <p className="text-lg sm:text-xl font-medium text-gray-600 mx-4 animate-slide-in-right">
//               {email}
//             </p>
//           </div>

//           <div className="py-8 px-6 sm:px-10 md:px-24 space-y-8 sm:space-y-10">
//             {/* About Section */}
//             <div className="animate-fade-in-up">
//               <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800 drop-shadow-lg">
//                 About
//               </h2>
//               <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
//                 <p className="text-lg sm:text-xl text-gray-800 tracking-wide leading-relaxed break-words">
//                   {bio}
//                 </p>
//               </div>
//             </div>

//             {/* Favorite Movie and Actor side by side */}
//             <div className="mt-6 flex flex-row gap-4 animate-slide-in-left">
//               <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 w-full sm:w-1/2">
//                 <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800 drop-shadow-lg">
//                   Favorite Movie
//                 </h2>
//                 <p className="text-lg sm:text-xl text-gray-700">
//                   {favoriteMovie}
//                 </p>
//               </div>

//               <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 w-full sm:w-1/2">
//                 <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800 drop-shadow-lg">
//                   Favorite Actor
//                 </h2>
//                 <p className="text-lg sm:text-xl text-gray-700">
//                   {favoriteActor}
//                 </p>
//               </div>
//             </div>

//             {/* Favorite Genre in separate section */}
//             <div className="mt-6 animate-slide-in-left">
//               <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
//                 <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800 drop-shadow-lg">
//                   Favorite Genre
//                 </h2>
//                 <p className="text-lg sm:text-xl text-gray-700">{genre}</p>
//               </div>
//             </div>

//             {/* Display form answers (e.g., hobbies, favorite food, etc.) */}
//             {formData && (
//               <div className="mt-6 animate-slide-in-left">
//                 <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800 drop-shadow-lg">
//                   Your Answers
//                 </h2>
//                 <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                     {formData.question1}: {formData.answer1}
//                   </h3>
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                     {formData.question2}: {formData.answer2}
//                   </h3>
//                   {/* Add more questions and answers as needed */}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <footer className="bg-gray-800 text-center py-4 mt-auto">
//         <p className="text-gray-400 text-sm">
//           &copy; 2025 Cine-Sphere. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default ProfileScreen;

import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();

  // Fetch the saved user data and form answers from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const formData = JSON.parse(localStorage.getItem("formData"));

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 text-white animate-fade-in">
        <h1 className="text-3xl animate-pulse">
          No user data found. Please fill out the form first.
        </h1>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("formData");
    navigate("/");
  };

  const fields = [
    { label: "Favorite Movie", value: userData.favoriteMovie },
    { label: "Favorite Actor", value: userData.favoriteActor },
    { label: "Favorite Music", value: userData.favoriteMusic },
    { label: "Favorite Book", value: userData.favoriteBook },
    { label: "Favorite Food", value: userData.favoriteFood },
    { label: "Hobby", value: userData.hobby },
    { label: "Dream Vacation", value: userData.dreamVacation },
    { label: "Favorite Sport", value: userData.favoriteSport },
    { label: "Pet Name", value: userData.petName },
    { label: "Favorite Season", value: userData.favoriteSeason },
    { label: "Favorite City", value: userData.favoriteCity },
    { label: "Dream Job", value: userData.dreamJob },
    { label: "Favorite Color", value: userData.favoriteColor },
    { label: "Life Motto", value: userData.lifeMotto },
  ];

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
      {/* Header Section */}
      <div className="flex justify-between items-center p-6">
        <h1 className="ml-[120px] sm:ml-12 text-4xl font-bold text-white">
          {userData.name}'s Profile
        </h1>
        <button
          onClick={handleLogout}
          className="mr-[120px] sm:mr-12 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-400 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Cover Photo Section */}
      <div
        className={`m-4 lg:mx-36 relative h-48 sm:h-60 md:mx-36 sm:mx-16  md:h-72 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl  ${
          userData.coverPhoto
            ? `bg-cover bg-center`
            : 'bg-cover bg-center bg-[url("https://via.placeholder.com/1200x500?text=Your+Cover+Photo")]]'
        }`}
        style={{
          backgroundImage: userData.coverPhoto
            ? `url(${userData.coverPhoto})`
            : "",
        }}
      >
        {/* Profile Picture with Bouncing Animation */}
        <div className="absolute bottom-[-25px] left-24 transform -translate-x-1/2 w-32 sm:w-40 h-32 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-bounce">
          <img
            src={userData.profilePicture || "/default-profile.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl m-6 sm:mx-10 md:mx-36 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">About</h2>
        <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
      </div>

      {/* Split Fields Section */}
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl mx-6 sm:mx-10 md:mx-36 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all"
          >
            <h4 className="text-xl font-semibold text-gray-800">
              {field.label}
            </h4>
            <p className="text-gray-700 mt-2">
              {field.value || "Not specified"}
            </p>
          </div>
        ))}
      </div>

      {/* Questions and Answers Section */}
      {formData && (
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl mx-6 sm:mx-10 md:mx-36 p-8 mt-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Questions & Answers
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200 text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="px-6 py-3 text-lg font-medium border border-gray-200">
                    Question
                  </th>
                  <th className="px-6 py-3 text-lg font-medium border border-gray-200">
                    Answer
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(formData).map((key, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 border border-gray-200 text-gray-800">
                      {formData[key].question}
                    </td>
                    <td className="px-6 py-4 border border-gray-200 text-gray-700">
                      {formData[key].answer || "Not answered"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-800 text-center py-4 mt-auto">
        <p className="text-gray-400 text-sm">
          &copy; 2025 Cine-Sphere. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProfileScreen;
