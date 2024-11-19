import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { user_data } from "../../Constant";
import bg_image from "../../assets/bg-image.jpg";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { styleCss_detailPage } from "../../Components/StyleCss";

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        const current_user = user_data.find((user) => user.id === parseInt(id));
        setUser(current_user || null);
    }, [id]);

    // const styleCss_detailPage = {
    //     sec: `w-ful h-screen flex justify-center items-center`,
    //     bgImage: `w-full bg-no-repeat h-full rounded-t-2xl`,
    //     main_div: `w-[70%] h-[85%] flex flex-col justify-center items-center rounded-2xl bg-gray-200`,
    //     profile: `absolute top-[6.3rem] w-[10rem] h-[10rem] backdrop-blur-sm rounded-full flex justify-center items-center`,
    //     arrow: `text-5xl text-white hover:text-yellow-400 cursor-pointer active:text-yellow-500`,
    //     about: `w-full h-[65%] flex flex-col justify-start items-center mt-16`,
    //     social_wrapper: `flex flex-col justify-center items-center`,
    //     name: `text-2xl font-semibold`,
    //     designation: `mt-1 mb-5 text-[17px] text-gray-600 font-medium`,
    //     socialCss: `flex justify-center gap-3 border-2 border-gray-300 rounded-md`,
    //     social_pf: `px-4 py-1 border-r-2 border-gray-300 font-semibold`,
    //     follow: `text-gray-400 text-sm`,
    //     about_me: `flex flex-col justify-center items-center`,
    //     social_handles: `text-xl inline-block p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-pulse`,
    //     insta: `text-pink-600 hover:bg-pink-100 focus:ring-pink-500`,
    //     facebook: `text-blue-600 hover:bg-blue-100 focus:ring-blue-500`,
    //     github: `text-black hover:bg-gray-100 focus:ring-gray-500`,
    //     twitter: `text-gray-600 hover:bg-gray-100 focus:ring-gray-500`,
    //     linkedIn: `text-blue-600 hover:bg-blue-100 focus:ring-blue-500`,
    // };

    const socialHandle = [
        {
            name: "facebook",
            link: user?.socialHandle.link_facebook,
            icon: <FaFacebookF />,
        },
        {
            name: "twitter",
            link: user?.socialHandle.link_twitter,
            icon: <FaTwitter />,
        },
        {
            name: "insta",
            link: user?.socialHandle.link_insta,
            icon: <FaInstagram />,
        },
        {
            name: "linkedin",
            link: user?.socialHandle.link_linkedin,
            icon: <FaLinkedin />,
        },
        {
            name: "github",
            link: user?.socialHandle.link_github,
            icon: <FaGithub />,
        },
    ];

    return (
        <>
            <section className={`${styleCss_detailPage.sec}`}>
                <div
                    className={styleCss_detailPage.main_div}
                >
                    <div onClick={() => navigator("/")} className="absolute top-5 left-5">
                        <FaLongArrowAltLeft className={styleCss_detailPage.arrow} />
                    </div>

                    <div className="w-full h-[35%]">
                        <img
                            src={bg_image}
                            alt="bg_image"
                            className="w-full bg-no-repeat h-full rounded-t-2xl"
                        />
                    </div>

                    <div className={styleCss_detailPage.about}>
                        <div className={styleCss_detailPage.social_wrapper}>
                            <h1 className={styleCss_detailPage.name}>{user?.name}</h1>
                            <h1 className={styleCss_detailPage.designation}>{user?.designation}</h1>
                            <div className={styleCss_detailPage.socialCss}>
                                <p className={styleCss_detailPage.social_pf}>
                                    {user?.social.post}{" "}
                                    <span className={styleCss_detailPage.follow}>Posts</span>
                                </p>
                                <p className={styleCss_detailPage.social_pf}>
                                    {user?.social.followers}{" "}
                                    <span className={styleCss_detailPage.follow}>followers</span>
                                </p>
                                <p className="px-4 py-1 font-semibold">
                                    {user?.social.followings}{" "}
                                    <span className={styleCss_detailPage.follow}>followings</span>
                                </p>
                            </div>
                        </div>

                        <div className={styleCss_detailPage.about_me}>
                            <h1 className="font-semibold mt-5 mb-2">About Me</h1>
                            <p className="text-gray-700">
                                Hey Connection my name is {user?.name} & i'm a{" "}
                                {user?.designation}
                            </p>
                        </div>

                        <h3 className="mt-4">Follow me on</h3>
                        <div className="w-full flex justify-center items-center mt-4">
                            {socialHandle.map((data) => (
                                <a
                                    key={data.id}
                                    href={data.link}
                                    target="_blank"
                                    className={`${styleCss_detailPage.social_handles} ${data.name === "facebook"
                                        ? styleCss_detailPage.facebook
                                        : data.name === "twitter"
                                            ? styleCss_detailPage.twitter
                                            : data.name === "github"
                                                ? styleCss_detailPage.github
                                                : data.name === "insta"
                                                    ? styleCss_detailPage.insta
                                                    : data.name === "linkedin"
                                                        ? styleCss_detailPage.linkedIn
                                                        : ""
                                        }`}
                                >
                                    {data.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styleCss_detailPage.profile}>
                        <img
                            src={user?.image}
                            alt={user?.name}
                            className="w-[85%] h-[85%] rounded-full"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
