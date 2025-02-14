import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthContext from '../components/context/AuthContext';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ 
    email:  '', 
    password: '' 
  });
  const { email, password } = formData;
  const { login, isAuthenticated, error, clearErrors, loading } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const result = await login({ email, password });

    if (result) {
      setIsLoading(false)
      navigate('/');
    }else{
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
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
      
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-8">Sign In</h1>
        <p className="text-gray-600 mb-8">
          Don't have an account yet? <Link to="/signup" className="text-green-600 hover:underline">Sign Up</Link>
        </p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name='email'
              onChange={handleChange}
              placeholder="Your username or email address"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-gray-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;