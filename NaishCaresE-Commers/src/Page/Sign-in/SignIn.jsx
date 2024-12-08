import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google-logo.png";
import IngLabelInput from "../../Components/InputLabel/InputLabel";
import Axios from "axios";
import { LOCALHOST_DOMAIN, requestOptions } from "../../Utils/utils";
import { toast } from "material-react-toastify";
import { Loader } from "../../Components/Loader";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        userName: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    }

    function clearForm() {
        setUserData({ userName: "", password: "" });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { userName, password } = userData;
        const identifier = userName.includes("@") ? { email: userName } : { userName };

        const userObj = { ...identifier, password };
        try {
            setLoading(true);
            const response = await Axios.post(`${LOCALHOST_DOMAIN}/sign-in`, userObj, requestOptions);
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                clearForm();
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Sign-in failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full h-auto overflow-y-auto bg-gray-100">
            <div className="w-full sm:w-[90%] md:max-w-4xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-6 md:px-8 mt-10 mb-10">
                {/* Left Section */}
                <div className="w-full md:w-1/2 h-auto md:h-screen bg-green-500 text-white flex flex-col items-center justify-center p-8 rounded-md md:rounded-l-xl lg:rounded-l-xl">
                    <h1 className="text-3xl font-bold mb-4 text-center md:text-left">Welcome Back!</h1>
                    <p className="text-md leading-6 text-center md:text-left mb-6">
                        Sign in to continue exploring exclusive offers, rewards, and discounts.
                    </p>
                    <p className="bg-green-400 text-white rounded-full px-4 py-2 text-center">
                        New to our platform?{" "}
                        <button
                            onClick={() => navigate("/sign-up")}
                            className="text-blue-800 hover:underline"
                        >
                            Create an Account!
                        </button>
                    </p>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 h-auto md:h-screen bg-white flex items-center justify-center px-6 py-8 rounded-md md:rounded-r-xl shadow-lg">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md flex flex-col gap-6"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">Sign In</h1>
                            <p className="text-gray-500 mt-2 text-center md:text-left">
                                Enter your details to log in!
                            </p>
                        </div>

                        <div className="flex justify-center items-center gap-2 border border-gray-300 rounded-lg h-12 cursor-pointer hover:shadow-md transition-shadow duration-300">
                            <img src={googleLogo} alt="Google Logo" className="w-6 h-6" />
                            <span>Sign In with Google</span>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-2">
                            <span className="flex-grow h-px bg-gray-300"></span>
                            <span className="text-sm text-gray-800">or</span>
                            <span className="flex-grow h-px bg-gray-300"></span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <IngLabelInput
                                type="text"
                                name="userName"
                                value={userData.userName}
                                onChange={handleChange}
                                required
                                placeholder="Email Address or Username"
                            />
                            <IngLabelInput
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                                placeholder="Password"
                            />
                        </div>

                        <div className="relative">
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${loading && "cursor-not-allowed"
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Sign In"}
                            </button>
                            {loading && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Loader />
                                </div>
                            )}
                            <p
                                className="absolute top-[3rem] right-0 text-sm text-blue-600 cursor-pointer hover:underline"
                                onClick={() => navigate("/forget-password")}
                            >
                                Forgot Password?
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    );
}
