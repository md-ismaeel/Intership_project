import React, { useState } from "react";
import horizonLogo from "../../assets/horizon-logo.png";
import FloatingLabelInput from "../../Components/FloatingInputLabel";
import { styleCss } from "../../Components/Style";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    if (password.length >= 8) {
      alert("Password reset successfully!");
      navigator("/");
      setPassword("");
    }
  }

  return (
    <>
      <section className={styleCss.section}>
        <div className={`w-[40%] h-full flex justify-center items-start`}>
          <form
            onSubmit={handleSubmit}
            className={`w-[80%] h-full text-white flex flex-col justify-start items-start`}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Forget Password</h1>
              <p className="text-gray-300 mt-3">
                Enter new password to reset your password!
              </p>
            </div>
            <FloatingLabelInput
              type="password"
              name="password"
              value={password}
              setUserData={setPassword}
              required
              placeholder="New Password!"
              label="New Password!"
            />
            <button type="submit" className={styleCss.button}>
              Reset Password
            </button>
          </form>
        </div>
        <div className="w-[45%]">
          <img
            src={horizonLogo}
            alt="Horizon Logo"
            className="w-full rounded-bl-[12rem]"
          />
        </div>
      </section>
    </>
  );
}
