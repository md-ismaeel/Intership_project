import React, { useState } from "react";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";
import ExtraSpace from "../../../Components/ExtraSpace/ExtraSpace";
import { useDispatch } from "react-redux";
import { setUserAuthenticated } from "../../../Redux/Slice/OrgSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Simulate API call
    setIsLoading(true);
    try {
      setTimeout(() => dispatch(setUserAuthenticated(true)), 500);
      setEmail("");
      setPassword("");
      toast.success("Login Successfully!");
      navigator("/");
    } catch (err) {
      setError("An error occurred during sign in");
      toast.error("An error occurred during sign in");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ExtraSpace />
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-1 mb-6">
            <h2 className="text-2xl font-bold text-center">Sign in</h2>
            <p className="text-center text-gray-500">
              Enter your email and password to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-sm text-center text-gray-500">
              <NavLink to="forget-password" className="hover:text-gray-900">
                Forgot password?
              </NavLink>
            </div>
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="text-green-600 hover:text-green-800"
              >
                Sign up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
