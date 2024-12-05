import React, { useState } from "react";
import horizonLogo from "../../assets/horizon-logo.png";
import FloatingLabelInput from "../../Components/FloatingInputLabel";
import { styleCss } from "../../Components/Style";
import { useNavigate, useNavigation } from "react-router-dom";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    newPassword: "",
  });

  const navigator = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function clearForm() {
    setUserData({ email: "", newPassword: "" });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword } = userData;
    const userObj = { email, password: newPassword };
    try {
      setLoading(true);
      const response = await Axios.post(
        `${LOCALHOST_DOMAIN}/forget-password`,
        userObj,
        requestOptions
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        clearForm();
        navigator("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message, "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styleCss.section}>
        <div
          className={`wrapper w-[40%] h-full flex justify-center items-start`}
        >
          <form
            onSubmit={handleSubmit}
            className={`form w-[80%] h-full text-white flex flex-col justify-start items-start`}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Forget Password</h1>
              <p className="text-gray-300 mt-3">
                Enter new password to reset your password!
              </p>
            </div>

            <FloatingLabelInput
              type="email"
              name="password"
              value={email}
              onChange={handleChange}
              required
              label="Email Address!"
            />

            <FloatingLabelInput
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
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
