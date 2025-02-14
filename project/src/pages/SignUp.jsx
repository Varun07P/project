import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/user/register", formData);
      console.log("Registration Success:", response.data);
      alert("Registration successful! Redirecting to Sign In...");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
      {/* Left Side */}
      <div className="flex flex-col justify-center">
        <Link to="/" className="text-2xl font-bold mb-8">3legant.</Link>
        <div className="w-full h-[300px] md:h-[400px] mb-8">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Interior Design"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-8">Sign up</h1>
        <p className="text-gray-600 mb-8">
          Already have an account? <Link to="/signin" className="text-green-600 hover:underline">Sign in</Link>
        </p>

        {/* Display error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <label className="flex items-start gap-2">
            <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300" required />
            <span className="text-gray-600">
              I agree with <Link to="/privacy" className="underline">Privacy Policy</Link> and{" "}
              <Link to="/terms" className="underline">Terms of Use</Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
