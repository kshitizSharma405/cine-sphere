// src/utils/localStore.js

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

// utils/localStore.js

export const getUserDetails = () => {
  const user = localStorage.getItem("cineSphereUser");
  return user ? JSON.parse(user) : null;
};

export const updateUserDetails = (user) => {
  localStorage.setItem("cineSphereUser", JSON.stringify(user));
};
