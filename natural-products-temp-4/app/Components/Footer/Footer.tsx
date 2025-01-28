"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, CreditCard, Truck, RefreshCw, Mail, Heart, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const customerServices = [
    { icon: ShoppingCart, text: "Order Tracking", href: "/order-tracking" },
    { icon: CreditCard, text: "Payment Options", href: "/payments" },
    { icon: Truck, text: "Shipping", href: "/shipping" },
    { icon: RefreshCw, text: "Returns", href: "/returns" },
  ];

  const quickLinks = [
    { text: "About Us", href: "/about" },
    { text: "Contact", href: "/contact" },
    { text: "FAQs", href: "/faqs" },
    { text: "Size Guide", href: "/size-guide" },
  ];

  const shopCategories = [
    { text: "New Arrivals", href: "/new" },
    { text: "Best Sellers", href: "/bestsellers" },
    { text: "Sale", href: "/sale" },
    { text: "Gift Cards", href: "/giftCards" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", color: "text-pink-500" },
    { icon: Facebook, href: "https://facebook.com", color: "text-blue-600" },
    { icon: Twitter, href: "https://twitter.com", color: "text-sky-400" },
    { icon: Linkedin, href: "https://linkedin.com", color: "text-blue-700" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border-t-2 mt-10">
      <div className="container mx-auto px-6 py-16">
        {/* Top Services Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16 text-center">
          {customerServices.map(({ icon: Icon, text, href }) => (
            <div key={text} className="flex flex-col items-center">
              <Icon className="text-indigo-600 mb-3" size={40} />
              <Link
                href={href}
                className="font-medium text-gray-700 hover:text-indigo-700 transition-colors"
              >
                {text}
              </Link>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="w-full flex flex-col gap-5 md:flex-row justify-between px:5 md:px-10 items-start">
          {/* Newsletter */}
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Stay Connected
            </h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex shadow-sm">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 rounded-r-lg hover:bg-indigo-700 transition-colors"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Links
            </h4>
            <div className="space-y-4">
              {quickLinks.map(({ text, href }) => (
                <Link
                  key={text}
                  href={href}
                  className="block text-gray-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Shop</h4>
            <div className="space-y-4">
              {shopCategories.map(({ text, href }) => (
                <Link
                  key={text}
                  href={href}
                  className="block text-gray-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Wishlist */}
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Connect</h4>
            <div className="flex space-x-5 mb-6">
              {socialLinks.map(({ icon: Icon, href, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${color} hover:opacity-75 transition-opacity`}
                >
                  <Icon size={24} />
                </Link>
              ))}
            </div>
            <Link
              href="/wishlist"
              className="flex items-center text-gray-600 hover:text-indigo-700 font-medium transition-colors"
            >
              <Heart className="mr-3" size={20} />
              My Wishlist
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600 mb-4">
            © {new Date().getFullYear()} Your E-Commerce Store. All Rights
            Reserved.
          </p>
          <div className="space-x-6">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-indigo-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-indigo-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
