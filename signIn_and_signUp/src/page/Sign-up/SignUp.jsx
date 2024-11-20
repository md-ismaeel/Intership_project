import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import horizonLogo from "../../assets/horizon-logo.png";
import googleLogo from "../../assets/google-logo.png";
import { styleCss } from "../../Components/Style";
import FloatingLabelInput from "../../Components/FloatingInputLabel";


export default function SignUp() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, userName, email, gender, password, confirmPassword } = userData;

    if (!firstName || !lastName || !userName || !email || !gender || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email address!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password === confirmPassword) {
      alert("User signed up successfully!");
      navigator("/");
      clearForm()
    }
  };

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

  return (
    <section className={styleCss.section}>
      <div className="w-[40%] h-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[80%] text-white">
          <div className="mb-3">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-300 mt-2">
              Enter your details to sign up!
            </p>
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
              setUserData={(value) => setUserData((prev) => ({ ...prev, firstName: value }))}
              required
              placeholder="First Name"
              label="First Name"
            />
            <FloatingLabelInput
              type="text"
              name="lastName"
              value={userData.lastName}
              setUserData={(value) => setUserData((prev) => ({ ...prev, lastName: value }))}
              required
              placeholder="Last Name"
              label="Last Name"
            />
            <FloatingLabelInput
              type="text"
              name="userName"
              value={userData.userName}
              setUserData={(value) => setUserData((prev) => ({ ...prev, userName: value }))}
              required
              placeholder="Username"
              label="Username"
            />
            <FloatingLabelInput
              type="text"
              name="gender"
              value={userData.gender}
              setUserData={(value) => setUserData((prev) => ({ ...prev, gender: value }))}
              required
              placeholder="Gender"
              label="Gender"
            />
            <FloatingLabelInput
              type="email"
              name="email"
              value={userData.email}
              setUserData={(value) => setUserData((prev) => ({ ...prev, email: value }))}
              required
              placeholder="Email Address"
              label="Email Address"
            />
            <FloatingLabelInput
              type="password"
              name="password"
              value={userData.password}
              setUserData={(value) => setUserData((prev) => ({ ...prev, password: value }))}
              required
              placeholder="Password"
              label="Password"
            />
            <FloatingLabelInput
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              setUserData={(value) => setUserData((prev) => ({ ...prev, confirmPassword: value }))}
              required
              placeholder="Confirm Password"
              label="Confirm Password"
            />
          </div>

          <button type="submit" className={styleCss.button}>
            Sign Up
          </button>

          <p className="mt-2 text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-500 cursor-pointer ml-1 hover:underline"
            >
              Login Now!
            </span>
          </p>
        </form>
      </div>

      <div className="w-[45%]">
        <img src={horizonLogo} alt="Horizon Logo" className="w-full rounded-bl-[12rem]" />
      </div>
    </section>
  );
}
