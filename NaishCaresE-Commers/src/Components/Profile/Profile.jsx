import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../../Redux/slices/usersSlice";
import { toast } from "material-react-toastify";
import { Loader } from "../Loader";

export default function Profile() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleLogOut() {
    setLoading(true);
    setTimeout(() => {
      dispatch(setAuthenticated(false));
      navigator("/");
      toast.success("Logged Out Successfully");
      setLoading(false);
    }, 1500)
  }

  return (
    <div className="absolute top-14 right-4 z-50 w-72 bg-white shadow-lg rounded-lg border border-gray-200 p-4 transition-transform transform scale-100">
      <div className="flex items-center mb-4">
        <FaRegUser className="text-gray-500 mr-3 text-2xl" />
        <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <span className="font-medium text-gray-600 mr-2">Name:</span>
          <span className="text-gray-800">Ismail</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-600 mr-2">Email:</span>
          <span className="text-gray-800 truncate">ismail@example.com</span>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={handleLogOut}
          className={`w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${loading && "cursor-not-allowed"
            }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Logout"}
        </button>
        {loading && (
          <div className="absolute left-14 z-10 top-1/2 -translate-y-1/2">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}


