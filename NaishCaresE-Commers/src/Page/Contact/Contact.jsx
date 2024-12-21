import React, { useState } from "react";
import { Mail, Phone, User, Send, CheckCircle, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronDown, ChevronUp } from "lucide-react";

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 flex justify-between items-center text-left hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 animate-fadeIn">{answer}</div>
      )}
    </div>
  );
};

const SocialButton = ({ Icon, color, label }) => (
  <button
    className={`h-10 w-10 rounded-full ${color} flex items-center justify-center transition-transform hover:scale-110`}
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </button>
);

const InfoCard = ({ icon: Icon, title, content, subContent, bgColor, textColor }) => (
  <div className="flex items-center gap-4">
    <div
      className={`h-10 w-10 rounded-full ${bgColor} flex items-center justify-center`}
    >
      <Icon className={`h-5 w-5 ${textColor}`} />
    </div>
    <div>
      <p className="text-gray-600">{title}</p>
      <p className="font-medium">{content}</p>
      {subContent && <p className="text-gray-600">{subContent}</p>}
    </div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    { Icon: Facebook, color: "bg-blue-100 text-blue-600", label: "Facebook" },
    { Icon: Twitter, color: "bg-sky-100 text-sky-600", label: "Twitter" },
    { Icon: Instagram, color: "bg-pink-100 text-pink-600", label: "Instagram" },
    { Icon: Linkedin, color: "bg-blue-100 text-blue-600", label: "LinkedIn" },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const faqs = [
    {
      question: "What is your response time?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for business accounts.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unused items in original packaging. Contact us for a return authorization.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90">
            We'd love to hear from you. Our team is always here to help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            {isSent ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-xl font-medium">
                  Thank you for your message!
                </p>
                <p className="text-gray-600 mt-2">
                  We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 
                        ${errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 
                        ${errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
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
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 
                      ${errors.message
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200"
                      }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 
                    text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <InfoCard
                  icon={Phone}
                  title="Call Us"
                  content="+1 234 567 890"
                  bgColor="bg-blue-100"
                  textColor="text-blue-600"
                />
                <InfoCard
                  icon={Mail}
                  title="Email Us"
                  content="support@company.com"
                  bgColor="bg-green-100"
                  textColor="text-green-600"
                />
                <InfoCard
                  icon={MapPin}
                  title="Visit Us"
                  content="123 Business Street, Suite 100"
                  subContent="Hyderabad Telangana 80000"
                  bgColor="bg-purple-100"
                  textColor="text-purple-600"
                />
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <SocialButton key={index} {...social} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="divide-y">
              {faqs.map((faq, index) => (
                <FAQ key={index} {...faq} />
              ))}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          <div className="bg-gray-200 rounded-xl h-64 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.4677225762866!2d-122.08424868468359!3d37.42199967981954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5eebf35a771%3A0x89b6430e1b3a8333!2sGoogleplex!5e0!3m2!1sen!2sus!4v1647483692925!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
