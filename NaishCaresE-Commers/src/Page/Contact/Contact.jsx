import React, { useState } from "react";
import { toast } from "material-react-toastify";
import { FaEnvelope, FaPhoneAlt, FaUser, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please correct the errors in the form");
      return;
    }

    // Simulate form submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success("Message sent successfully!");

      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6">
      {/* Contact Information Section */}
      <div className="w-full lg:w-1/2 max-w-md mb-8 lg:mb-0 lg:mr-12">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-green-600 mr-4 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-800">Call to Us</h2>
          </div>
          <p className="text-gray-600 mb-2">
            We are available 24/7, 7 days a week.
          </p>
          <p className="text-green-600 font-semibold">Phone: +1 234 567 890</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-green-600 mr-4 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-800">Email Us</h2>
          </div>
          <p className="text-gray-600 mb-2">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <p className="text-green-600 font-semibold">
            customer@naishanaturals.com
          </p>
          <p className="text-green-600 font-semibold">
            support@naishanaturals.com
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Contact Us
          </h1>

          {isSent ? (
            <div className="text-center">
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <p className="text-green-600 font-semibold">
                Your message has been sent!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${errors.name
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-green-300"
                      }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-green-300"
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${errors.message
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-green-300"
                    }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-md text-white font-semibold transition-all duration-300 flex items-center justify-center ${isSubmitting
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  }`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
