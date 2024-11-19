import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import horizonLogo from "../../assets/horizon-logo.png";
import googleLogo from "../../assets/google-logo.png";
import { styleCss } from "../../Components/Style";

export default function SignIn() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((pre) => ({ ...pre, [name]: value }));
  };

  function clearForm() {
    setUserData({ email: "", password: "" });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = userData.email.includes("@");
    const isValidPassword = userData.password.length < 8;

    if (!isValidEmail) {
      alert("Email is not valid!");
      return;
    }

    if (isValidPassword) {
      alert("Password length should be minimum 8 character");
      return;
    }

    if (isValidEmail) {
      clearForm();
      setTimeout(() => alert("user login successfully!!"), 1000);
    }
  };

  return (
    <>
      <section className={styleCss.section}>
        <div className={`w-[40%] h-full flex justify-center items-center`}>
          <form onSubmit={handleSubmit} className={`w-[80%] text-white`}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <p className="text-gray-300 mt-3">
                Enter your email and password to sign in!
              </p>
            </div>
            <div className={styleCss.signInWidthGoogle}>
              <img src={googleLogo} alt="logo" height={"25px"} width={"25px"} />
              <span>Sign In with Google</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="w-[45%] bg-gray-500 h-[1px]"></p>
              <p className="px-2 py-1">or</p>
              <p className="w-[45%] bg-gray-500 h-[1px]"></p>
            </div>

            <div className="flex flex-col gap-2">
              <label>Email*</label>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="mail@simple.com"
                required
                className={styleCss.input}
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label>Password*</label>
              <input
                type="text"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                placeholder="min. 8 characters"
                className={styleCss.input}
              />
            </div>
            <button type="submit" className={styleCss.button}>
              Sign In
            </button>

            <p className="mt-2 text-gray-300">
              Not registered yet?
              <span
                onClick={() => navigator("/sign-up")}
                className="text-blue-500 cursor-pointer ml-4 hover:underline"
              >
                create an account
              </span>
            </p>
          </form>
        </div>

        <div className={`w-[45%]`}>
          <img
            src={horizonLogo}
            alt="logo"
            className={`w-full rounded-bl-[12rem]`}
          />
        </div>
      </section>
    </>
  );
}
