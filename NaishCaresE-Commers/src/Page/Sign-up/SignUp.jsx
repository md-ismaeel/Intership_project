import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google-logo.png";
import IngLabelInput from "../../Components/InputLabel/InputLabel";
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
            if (response?.data?.success) {
                toast.success(response.data.message);
                clearForm();
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            toast.error("Sign-up failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full h-auto overflow-y-auto bg-gray-100">
            <div className="w-[90%] sm:w-[90%] md:max-w-4xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center mt-10 mb-10">
                {/* Left Section */}
                <div className="w-full md:w-1/2 h-auto md:h-screen bg-green-500 text-white flex flex-col items-center justify-center p-8 rounded-md md:rounded-l-xl lg:rounded-l-xl ">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Come join us!</h1>
                    <p className="text-sm md:text-md leading-5 md:leading-6 mb-6">
                        We are excited to have you here. Create an account to get access to
                        exclusive offers, rewards, and discounts.
                    </p>
                    <p className="bg-green-400 text-white rounded-full px-3 py-1 md:px-4 md:py-2">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="text-white font-semibold hover:text-blue-600 hover:underline"
                        >
                            Login Now!
                        </button>
                    </p>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 h-auto md:h-screen bg-white flex items-center justify-center p-6 md:p-8 rounded-md md:rounded-r-xl lg:rounded-r-xl shadow-xl">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md flex flex-col gap-4 sm:gap-6"
                    >
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                                Create An Account
                            </h1>
                            <p className="text-sm md:text-gray-500 mt-1">
                                Enter your details to sign up!
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <IngLabelInput
                                type="text"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="First Name"
                            />
                            <IngLabelInput
                                type="text"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Last Name"
                            />
                            <IngLabelInput
                                type="text"
                                name="userName"
                                value={userData.userName}
                                onChange={handleChange}
                                required
                                placeholder="Username"
                            />
                            <IngLabelInput
                                type="text"
                                name="gender"
                                value={userData.gender}
                                onChange={handleChange}
                                required
                                placeholder="Gender"
                            />
                            <IngLabelInput
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email Address"
                            />
                            <IngLabelInput
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                                placeholder="Password"
                            />
                            <IngLabelInput
                                type="password"
                                name="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm Password"
                            />
                        </div>

                        <div className="relative">
                            <button
                                type="submit"
                                className={`w-full h-12 py-2 md:py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition ${loading && "cursor-not-allowed"
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Sign Up"}
                            </button>
                            {loading && (
                                <div className="absolute left-28 z-10 top-1/2 -translate-y-1/2">
                                    <Loader />
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
