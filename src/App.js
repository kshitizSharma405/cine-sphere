import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing pages and components
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile"; // Profile page
import Banner from "./components/Banner";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import FormPage from "./pages/FormPage";
import ProfileScreen from "./pages/ProfileScreen";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const isLoggedIn = JSON.parse(localStorage.getItem("cineSphereUser"));

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsReturningUser(true);
      setTimeout(() => {
        setIsReturningUser(false);
      }, 4000); // Show landing page for 4 seconds
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isReturningUser ? <LandingPage fadeOut={true} /> : <LandingPage />
          }
        />
        <Route path="/form" element={<FormPage />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

{
  /* <div className={darkMode ? "dark" : ""}> */
}
// {" "}
{
  /* Apply dark class for dark mode */
}
{
  /* <div className="bg-gray-100 dark:bg-gray-900 dark:text-white"> */
}
{
  /* <Banner darkMode={darkMode} /> */
}
{
  /* Dark mode toggle */
}
{
  /* <div */
}
// className="fixed top-4 right-4 p-2 bg-gray-300 rounded-full cursor-pointer dark:bg-gray-700"
// onClick={toggleDarkMode}
// >
{
  /* <span className="text-xl">{darkMode ? "🌙" : "🌞"}</span> */
}
{
  /* </div> */
}
{
  /*  */
}
{
  /* <div className="container mx-auto p-6"> */
}
{
  /* <Route path="/login" element={<Login />} />{" "} */
}
{
  /* <Route path="/register" element={<Register darkMode={false} />} /> */
}
{
  /* {isLoggedIn ? ( */
}
{
  /* <> */
}
{
  /* <Route */
}
// path="/profile"
// element={<Profile darkMode={false} />}
// />
{
  /* <Route path="/" element={<Home />} /> */
}
{
  /* </> */
}
{
  /* ) : ( */
}
{
  /* <Route path="*" element={<Login />} /> // Redirect to login if not logged in */
}
{
  /* )} */
}
// </div>
// </div>
// </div>
