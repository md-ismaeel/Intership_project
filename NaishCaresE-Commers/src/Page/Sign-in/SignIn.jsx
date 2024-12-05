import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import horizonLogo from "../../assets/horizon-logo.png";
import googleLogo from "../../assets/google-logo.png";
import { styleCss } from "../../Components/Style";
import FloatingLabelInput from "../../Components/InputLabel/FloatingInputLabel";
import { toast } from "material-react-toastify";
import Axios from "axios";
import { LOCALHOST_DOMAIN, requestOptions } from "../../Utils/utils";
import { Loader } from "../../Components/Loader";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        userName: "",
        password: "",
    });

    const navigator = useNavigate();

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
        const identifier = userData.userName.includes("@")
            ? { email: userName }
            : { userName: userName };

        const userObj = { ...identifier, password };
        try {
            setLoading(true);
            const response = await Axios.post(
                `${LOCALHOST_DOMAIN}/sign-in`,
                userObj,
                requestOptions
            );
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                clearForm();
                navigator("/dashboard");
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
        <>
            <section className={styleCss.section}>
                <div
                    className={`wrapper w-[40%] h-full flex justify-center items-center`}
                >
                    <form onSubmit={handleSubmit} className={`form w-[80%] text-white`}>
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
                        <div className={`${styleCss.underlineOrCss} mb-4`}>
                            <p className="w-[45%] bg-gray-500 h-[1px]"></p>
                            <p className="px-2 py-1">or</p>
                            <p className="w-[45%] bg-gray-500 h-[1px]"></p>
                        </div>

                        <div className={styleCss.container}>
                            <FloatingLabelInput
                                type="text"
                                name="userName"
                                value={userData.userName}
                                onChange={handleChange}
                                require
                                label="Email Address & userName!"
                            />
                            <FloatingLabelInput
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                                label="Password!"
                            />
                        </div>

                        <div className="relative">
                            <button
                                type="submit"
                                className={`${styleCss.button} ${loading ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Loading" : "Sign In"}
                            </button>
                            <div className={styleCss.loader}>{loading && <Loader />}</div>
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

                <div className={`horizon-logo w-[45%]`}>
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
