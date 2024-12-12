import React, { useState, useRef, useEffect } from 'react';
import { FaLeaf, FaTruck, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function About() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [heights, setHeights] = useState({});
  const faqRefs = useRef({});

  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  useEffect(() => {
    // Dynamically calculate heights for smooth animation
    const newHeights = {};
    Object.keys(faqRefs.current).forEach((key) => {
      if (faqRefs.current[key]) {
        newHeights[key] = faqRefs.current[key].scrollHeight;
      }
    });
    setHeights(newHeights);
  }, []);

  const FAQs = [
    {
      question: "What products do you offer?",
      answer: "We offer a variety of daily essentials, including fresh milk, ghee, paneer, and other natural farming products sourced directly from local farms.",
      icon: <FaLeaf className="text-green-600 mr-3" />
    },
    {
      question: "How do I place an order?",
      answer: "You can easily place an order by browsing our product catalog online, adding items to your cart, and completing the checkout process. We offer multiple payment options for your convenience.",
      icon: <FaCheckCircle className="text-blue-600 mr-3" />
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes, we provide home delivery for all our products. You can select your preferred delivery option during checkout, with flexible scheduling to suit your needs.",
      icon: <FaTruck className="text-purple-600 mr-3" />
    }
  ];

  const coreValues = [
    {
      title: "Quality",
      description: "We prioritize the highest standards for all our products.",
      color: "text-green-600"
    },
    {
      title: "Sustainability",
      description: "Dedicated to practices that support our planet and ecosystem.",
      color: "text-blue-600"
    },
    {
      title: "Customer Satisfaction",
      description: "Our goal is to ensure every customer is delighted with their experience.",
      color: "text-purple-600"
    }
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 
            transform transition duration-300 hover:scale-105 hover:text-green-700">
            About Naisha Naturals
          </h1>
          <div className="h-1 w-24 bg-green-500 mx-auto mb-4 rounded"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bringing nature's goodness directly to your doorstep with passion, quality, and sustainability.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
              <FaLeaf className="mr-3 text-green-600" /> Our Mission
            </h2>
            <p className="text-gray-700">
              We are committed to bringing you the finest daily essentials directly from nature to your doorstep. Our mission is to provide high-quality, natural products that enrich your daily life.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
              <FaTruck className="mr-3 text-blue-600" /> Our Vision
            </h2>
            <p className="text-gray-700">
              We envision a world where natural and sustainable products are easily accessible to everyone, supporting healthy lifestyles and promoting environmental responsibility.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {coreValues && coreValues.map((value, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 rounded-lg transform transition duration-300 hover:scale-105"
              >
                <div className={`text-5xl mb-4 ${value.color} text-center w-full flex justify-center`}>
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>

          {FAQs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg 
                  hover:bg-gray-200 transition duration-300"
              >
                <div className="flex items-center">
                  {faq.icon}
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                </div>
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              <div
                ref={(el) => faqRefs.current[index] = el}
                style={{
                  maxHeight: activeIndex === index ? `${heights[index]}px` : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-out'
                }}
                className="bg-gray-50 rounded-b-lg"
              >
                <p className="p-4 text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}