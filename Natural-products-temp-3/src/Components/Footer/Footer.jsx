import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPhoneAlt,FaYoutube } from "react-icons/fa";
// import logoImage from "../../../public/N4N-logo.avif";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  const socialHandle = [
    {
      name: "facebook",
      link: `https://www.facebook.com/`,
      icon: <FaFacebookF />,
      hoverClass: "text-blue-600",
    },
    {
      name: "youtube",
      link: `https://www.youtube.com/`,
      icon: <FaYoutube />,
      hoverClass: "text-red-600",
    },
    {
      name: "insta",
      link: `https://www.instagram.com/ismail_15_/`,
      icon: <FaInstagram />,
      hoverClass: "text-pink-600",
    },
    // {
    //   name: "linkedin",
    //   link: `https://www.linkedin.com/`,
    //   icon: <FaLinkedin />,
    //   hoverClass: "text-blue-700",
    // },
    // {
    //   name: "github",
    //   link: `https://github.com/md-ismaeel`,
    //   icon: <FaGithub />,
    //   hoverClass: "text-gray-200",
    // },
  ];

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Shop" },
    { path: "/about", label: "About" },
  ];


  return (
    <footer className="relative bg-gray-900 text-white py-12 px-4 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-gray-900 opacity-10 animate-pulse"></div>

      {/* Logo Section */}
      <div className="relative flex flex-col items-center mb-8">
        <div
          className={`w-24 h-24 mb-4 transition-all duration-300 ${isHovered ? "scale-105 rotate-6 cursor-pointer" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={""}
            alt="Logo"
            className="w-full h-full object-contain rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-2xl font-bold text-green-300 tracking-wider">
          N4N Naturals
        </h1>
        <p className="text-sm text-gray-300 mt-2">
          Fresh & Pure Essentials for Your Daily Needs
        </p>
      </div>

      {/* Content Grid */}
      <div className="relative grid md:grid-cols-3 gap-8 mb-8">
        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-green-300">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {navLinks.map((link, i) => (
              <li key={i}>
                <NavLink to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-green-300 transition-colors duration-300"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-green-300">
            Contact Us
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:info@naishanaturals.com"
                className="flex items-center justify-center gap-2 text-gray-300 hover:text-green-300 transition-colors"
              >
                <FaEnvelope /> info@n4nnaturals.com
              </a>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center gap-2 text-gray-300 hover:text-green-300 transition-colors"
              >
                <FaPhoneAlt /> +1 234 567 890
              </a>
            </li>
            <li className="text-gray-300">123 Green Lane, Farming Town</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-green-300">
            Connect With Us
          </h2>
          <div className="flex justify-center space-x-2">
            {socialHandle.map((data) => (
              <a
                key={data.name}
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  text-2xl p-3 rounded-full transition-all duration-300 
                  transform hover:scale-110 hover:rotate-12 
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${data.hoverClass}
                `}
              >
                {data.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative text-center text-sm border-t border-gray-700 pt-6">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} N4N Naturals. All rights
          reserved.
        </p>
        <p>
          Crafted with <span className="text-red-500">❤</span> by{" "}
          <a
            target="_blank"
            href="https://www.youtube.com/"
            className="text-green-300 hover:underline"
          >
            Your Creative Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
