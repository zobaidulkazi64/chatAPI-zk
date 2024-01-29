"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios"; // Import Axios

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    agreeTerms: false, // Add agreeTerms to formData
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // Add setMessage state

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    // Validation logic here

    // ... existing validation logic

    setErrors(newErrors);

    try {
      const response = await axios.post(
        "http://localhost:3311/api/createUser",
        formData
      );

      if (response.status === 201) {
        const data = response.data;
        setMessage("User registered successfully");
        console.log("User registered successfully:", data);
      } else {
        setMessage("Error occurred during registration");
        console.error("Error occurred during registration:", response.data);
      }
    } catch (error) {
      setMessage("Error occurred during registration");
      console.error("Error occurred during registration:", error);
    }
  };

  return (
    <div className="min-h-screen fixed w-full  flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <Link
            href="/signup"
            className="text-2xl font-bold mb-4 uppercase bg-emerald-300 rounded-md p-2"
          >
            Sign Up
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.username && "border-red-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.email && "border-red-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.password && "border-red-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Retype Password */}
          <div className="mb-4">
            <label
              htmlFor="retypePassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Retype Password
            </label>
            <input
              type="password"
              id="retypePassword"
              name="retypePassword"
              value={formData.retypePassword}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.retypePassword && "border-red-500"
              }`}
            />
            {errors.retypePassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.retypePassword}
              </p>
            )}
          </div>

          {/* Agree to Terms Checkbox */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className={`mr-2 ${errors.agreeTerms && "border-red-500"}`}
              />
              <span className="text-gray-700 text-sm">
                I agree to the terms and conditions
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
            )}

            <div></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue flex items-center justify-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
