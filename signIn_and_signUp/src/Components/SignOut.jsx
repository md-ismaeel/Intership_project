import Axios from "axios";
import React, { useState } from "react";
import { Loader } from "./Loader";
import { LOCALHOST_DOMAIN, requestOptions } from "../Utils/utils";
import { toast } from "material-react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  async function handleLogout() {
    try {
      setLoading(true);
      const response = await Axios.get(
        `${LOCALHOST_DOMAIN}/sign-out`,
        requestOptions
      );
      // console.log("sign-up", response?.data);
      if (response?.data?.success) {
        toast.success(response.data.message);
        navigator("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message,
        "Sign-up failed! Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-full h-screen">
        <div className="absolute top-5 right-5 w-full h-auto flex justify-end">
          <div className="relative">
            <button
              className={`w-[150px] h-[55px] bg-blue-600 text-lg hover:bg-blue-700 rounded-md text-white font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Loading" : "SignOut"}
            </button>
            <div className="absolute top-4 right-4">
              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
