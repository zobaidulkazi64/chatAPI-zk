"use client";

import { useState } from "react";
import Link from "next/link";
import Axios from "axios"; // Fix the import statement
import { useRouter } from 'next/navigation'


const SignUpForm = () => {
  const router = useRouter()

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic here

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await Axios.post(
          "http://localhost:3311/api/login",
          formData
        );
        if (response.status === 200) {
          const data = response.data;
          console.log("User registered successfully:", data);
          router.push('/login')
        } else {
          console.error("Error occurred during registration:", response.data);
        }
      } catch (error) {
        console.error("Error occurred during registration:", error);
      }
    }
  
  };

  return (
    <div className="  flex  min-h-screen fixed w-full items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Sign Up
            </button>

            <Link className="text-xm" href="/forgat-password">
              Forgat Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
