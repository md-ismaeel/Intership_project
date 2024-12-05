import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import horizonLogo from "../../assets/horizon-logo.png";
import googleLogo from "../../assets/google-logo.png";
import { styleCss } from "../../Components/Style";
import FloatingLabelInput from "../../Components/FloatingInputLabel";
import Axios from "axios";
import { LOCALHOST_DOMAIN, requestOptions } from "../../Utils/utils";
import { toast } from "material-react-toastify";
import { Loader } from "../../Components/Loader";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  const clearForm = () => {
    setUserData({
      firstName: "",
      lastName: "",
      userName: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObj = { ...userData };

    try {
      setLoading(true);
      const response = await Axios.post(
        `${LOCALHOST_DOMAIN}/sign-up`,
        userObj,
        requestOptions
      );
      // console.log("sign-up", response?.data);
      if (response?.data?.success) {
        toast.success(response.data.message);
        clearForm();
        navigate("/");
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
  };

  return (
    <section className={styleCss.section}>
      <div className="wrapper w-[40%] min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="form w-[80%] text-white">
          <div className="mb-1">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-300 mt-1">Enter your details to sign up!</p>
          </div>

          <div className={styleCss.signInWidthGoogle}>
            <img src={googleLogo} alt="logo" height="25px" width="25px" />
            <span>Sign Up with Google</span>
          </div>

          <div className={styleCss.underlineOrCss}>
            <span className="w-[45%] bg-gray-500 h-[1px]"></span>
            <span className="px-2 py-1">or</span>
            <span className="w-[45%] bg-gray-500 h-[1px]"></span>
          </div>

          <div className={styleCss.container}>
            <FloatingLabelInput
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
              label="First Name!"
            />
            <FloatingLabelInput
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
              label="Last Name!"
            />
            <FloatingLabelInput
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              required
              label="Username!"
            />
            <FloatingLabelInput
              type="text"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              required
              label="Gender!"
            />
            <FloatingLabelInput
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              label="Email Address!"
            />
            <FloatingLabelInput
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              label="Password!"
            />
            <FloatingLabelInput
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
              label="Confirm Password!"
            />
          </div>

          <div className="relative">
            <button
              type="submit"
              className={`${styleCss.button} ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading" : "Sign Up"}
            </button>
            <div className={styleCss.loader}>{loading && <Loader />}</div>
            <p className="mt-2 text-gray-300 mb-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-blue-500 cursor-pointer ml-1 hover:underline"
              >
                Login Now!
              </span>
            </p>
          </div>
        </form>
      </div>

      <div className="horizon-logo w-[45%]">
        <img
          src={horizonLogo}
          alt="Horizon Logo"
          className="w-full rounded-bl-[12rem]"
        />
      </div>
    </section>
  );
}
