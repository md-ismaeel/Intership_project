import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import horizonLogo from "../../assets/horizon-logo.png";
import googleLogo from "../../assets/google-logo.png";
import { styleCss } from "../../Components/Style";
import FloatingLabelInput from "../../Components/FloatingInputLabel";


export default function SignIn() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigator = useNavigate();

  function clearForm() {
    setUserData({ email: "", password: "" });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
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

    if (password.length >= 8) {
      alert("User sign in successfully!");
      navigator("/dashboard");
      clearForm();
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
            <div className={styleCss.underlineOrCss}>
              <p className="w-[45%] bg-gray-500 h-[1px]"></p>
              <p className="px-2 py-1">or</p>
              <p className="w-[45%] bg-gray-500 h-[1px]"></p>
            </div>

            <div className={styleCss.container}>
              <FloatingLabelInput
                type="email"
                name="email"
                value={userData.email}
                setUserData={(value) =>
                  setUserData((prev) => ({ ...prev, email: value }))
                }
                required
                placeholder="Email Address!"
                label="Email Address!"
              />
              <FloatingLabelInput
                type="password"
                name="password"
                value={userData.password}
                setUserData={(value) =>
                  setUserData((prev) => ({ ...prev, password: value }))
                }
                required
                placeholder="Password!"
                label="Password!"
              />
            </div>

            <div className="relative">
              <button type="submit" className={styleCss.button}>
                Sign In
              </button>

              <p
                className={styleCss.forget_password}
                onClick={() => navigator("/forget-password")}
              >
                Forget password!
              </p>
            </div>
            <p className="mt-5 text-gray-300">
              Not registered yet?
              <span
                onClick={() => navigator("/sign-up")}
                className="text-blue-500 cursor-pointer ml-1 hover:underline"
              >
                Create An Account!
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
