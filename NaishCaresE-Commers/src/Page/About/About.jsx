import React, { useState } from 'react';

export default function About() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition duration-300">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to Naisha Naturals! We are committed to bringing you the finest daily essentials, including milk, ghee, paneer, and farming products directly from nature to your doorstep. Our mission is to provide high-quality, natural products to enrich your daily life.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition duration-300">
          Our Vision
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          At Naisha Naturals, we envision a world where natural and sustainable products are easily accessible to everyone. We aim to support healthy lifestyles and promote environmental responsibility by offering products that are ethically sourced and carefully crafted.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition duration-300">
          Our Values
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
          <li>Quality: We prioritize the highest standards for all our products.</li>
          <li>Sustainability: We are dedicated to practices that support our planet.</li>
          <li>Customer Satisfaction: Our goal is to ensure every customer is delighted with their experience.</li>
        </ul>

        {/* Interactive FAQ Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition duration-300">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <button
              className="w-full text-left p-4 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
              onClick={() => toggleFAQ(0)}
            >
              What products do you offer?
            </button>
            {activeIndex === 0 && (
              <p className="text-gray-700 p-4 bg-gray-100 rounded-md mt-2">
                We offer a variety of daily essentials, including fresh milk, ghee, paneer, and other natural farming products.
              </p>
            )}
          </div>

          <div>
            <button
              className="w-full text-left p-4 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
              onClick={() => toggleFAQ(1)}
            >
              How do I place an order?
            </button>
            {activeIndex === 1 && (
              <p className="text-gray-700 p-4 bg-gray-100 rounded-md mt-2">
                You can easily place an order by browsing our product catalog, adding items to your cart, and completing the checkout process.
              </p>
            )}
          </div>

          <div>
            <button
              className="w-full text-left p-4 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
              onClick={() => toggleFAQ(2)}
            >
              Do you offer home delivery?
            </button>
            {activeIndex === 2 && (
              <p className="text-gray-700 p-4 bg-gray-100 rounded-md mt-2">
                Yes, we offer home delivery for all our products. You can select your preferred delivery option during checkout.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
