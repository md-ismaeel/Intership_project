import React, { useState } from "react";
import {
  FaFacebookF, FaTwitter, FaLinkedin, FaGithub, FaInstagram,
  FaEnvelope, FaPhoneAlt, FaYoutube, FaMapMarkerAlt, FaNewspaper,
  FaArrowRight, FaClock, FaLeaf
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [email, setEmail] = useState("");

  const socialHandles = [
    {
      name: "facebook",
      link: "https://www.facebook.com/",
      icon: <FaFacebookF />,
      hoverClass: "text-blue-600",
      label: "Follow us on Facebook"
    },
    {
      name: "youtube",
      link: "https://www.youtube.com/",
      icon: <FaYoutube />,
      hoverClass: "text-red-600",
      label: "Watch our videos"
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/",
      icon: <FaInstagram />,
      hoverClass: "text-pink-600",
      label: "Follow us on Instagram"
    },
    {
      name: "twitter",
      link: "https://twitter.com/",
      icon: <FaTwitter />,
      hoverClass: "text-blue-400",
      label: "Follow us on Twitter"
    }
  ];

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-br from-emerald-900 via-gray-900 to-emerald-900 text-white py-16 px-4 md:px-12 overflow-hidden">

      {/* Animated Backdrop */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <div
            className={`w-32 h-32 mb-4 transition-all duration-500 ${isLogoHovered ? "scale-110 rotate-6" : ""
              }`}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <img
              src={"https://thumbs.dreamstime.com/b/organic-logo-design-concept-template-organic-logotype-template-organic-farm-fresh-products-unique-sign-icon-art-isolated-97665363.jpg"}
              alt="N4N Naturals Logo"
              className="w-full h-full object-contain rounded-full shadow-xl shadow-emerald-900/30"
            />
          </div>
          <h1 className="text-3xl font-bold text-emerald-300 tracking-wider mb-2">
            Natural Products
          </h1>
          <p className="text-lg text-gray-300 max-w-md text-center">
            Nurturing Nature's Nobility - Your Gateway to Pure & Organic Living
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-300 border-b border-emerald-700 pb-2">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={i} className="transform hover:translate-x-2 transition-transform">
                  <NavLink
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-gray-300 hover:text-emerald-300 flex items-center gap-2"
                  >
                    <FaArrowRight className="text-sm" />
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-300 border-b border-emerald-700 pb-2">
              Business Hours
            </h2>
            <ul className="space-y-3">
              {businessHours.map((schedule, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <FaClock className="text-emerald-400" />
                  <div>
                    <p className="font-medium">{schedule.day}</p>
                    <p className="text-sm text-gray-400">{schedule.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-300 border-b border-emerald-700 pb-2">
              Contact Us
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@naturals.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-emerald-300 transition-colors group"
                >
                  <FaEnvelope className="group-hover:rotate-12 transition-transform" />
                  info@naturals.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-gray-300 hover:text-emerald-300 transition-colors group"
                >
                  <FaPhoneAlt className="group-hover:rotate-12 transition-transform" />
                  +1 234 567 890
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <FaMapMarkerAlt className="mt-1 text-emerald-400" />
                <span>
                  123 Green Lane, Farming Town,<br />
                  Nature Valley, EC12 345
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-300 border-b border-emerald-700 pb-2">
              Stay Connected
            </h2>
            <p className="text-gray-300">Subscribe to our newsletter for updates and exclusive offers!</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-emerald-700 rounded-lg focus:outline-none focus:border-emerald-500 text-gray-300"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FaNewspaper />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-emerald-300">
            Connect With Us
          </h2>
          <div className="flex justify-center space-x-4">
            {socialHandles.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-3 rounded-full bg-gray-800 transition-all duration-300 
                  transform hover:scale-110 hover:-translate-y-1
                  ${social.hoverClass}`}
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {social.icon}
                {hoveredIcon === social.name && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-gray-900 px-2 py-1 rounded">
                    {social.label}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-emerald-800 pt-8">
          <p className="flex items-center justify-center gap-2 text-gray-300 mb-2">
            <FaLeaf className="text-emerald-400" />
            Committed to Sustainable & Organic Practices
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} N4N Naturals. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Crafted with <span className="text-red-500">❤</span> by{" "}
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Your Creative Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;