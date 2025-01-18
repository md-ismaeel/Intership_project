import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Globe, Send, Check, AlertCircle } from "lucide-react";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", department: "customer-service", preferredContact: "email", orderNumber: "", });

    const [submitStatus, setSubmitStatus] = useState({ status: "", message: "" });
    const [activeTab, setActiveTab] = useState("form");
    const [selectedCard, setSelectedCard] = useState(null);
    color: "bg-blue-50"

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus({
            status: "success",
            message: "Message sent successfully!",
        });
        setTimeout(() => {
            setSubmitStatus({ status: "", message: "" });
            setFormData({ name: "", email: "", subject: "", message: "", department: "customer-service", preferredContact: "email", orderNumber: "", });
        }, 3000);
    };

    const infoCards = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Contacts",
            content: {
                "Customer Service": "support@organicstore.com",
                "Business Inquiries": "business@organicstore.com",
                Wholesale: "wholesale@organicstore.com",
            },
            color: "bg-blue-50"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone Numbers",
            content: {
                "Main Line": "+1 (555) 123-4567",
                "Customer Support": "+1 (555) 234-5678",
                Wholesale: "+1 (555) 345-6789",
            },
            color: "bg-blue-50"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Locations",
            content: {
                "Main Store": "123 Organic Lane, Nature City, NC 12345",
                Warehouse: "456 Distribution Ave, Nature City, NC 12346",
                "Pickup Point": "789 Collection Blvd, Nature City, NC 12347",
            },
            color: "bg-blue-50"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Hours of Operation",
            content: {
                "Store Hours": "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
                "Customer Support":
                    "Mon - Fri: 8:00 AM - 8:00 PM\nSat: 9:00 AM - 5:00 PM",
                Warehouse: "Mon - Fri: 7:00 AM - 7:00 PM",
            },
            color: "bg-blue-50"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Online Channels",
            content: {
                Website: "www.organicstore.com",
                Blog: "blog.organicstore.com",
                "Store Locator": "organicstore.com/locations",
            },
            color: "bg-blue-50"
        },
    ];

    return (
        <>
            <ExtraSpace />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-16 text-center">
                    <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-md shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-lg max-w-2xl mx-auto opacity-90">
                            Have questions about our organic products? We're here to help
                            through multiple channels.
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => setActiveTab("form")}
                            className={`px-6 py-3 rounded-md transition-all duration-300 font-semibold ${activeTab === "form"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-green-50"
                                }`}
                        >
                            Contact Form
                        </button>
                        <button
                            onClick={() => setActiveTab("info")}
                            className={`px-6 py-3 rounded-md transition-all duration-300 font-semibold ${activeTab === "info"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-green-50"
                                }`}
                        >
                            Contact Information
                        </button>
                    </div>
                </div>

                {/* form and info  */}
                <div className={`${activeTab === "form" ? "max-w-4xl" : "max-w-7xl"} mx-auto`}>
                    {activeTab === "form" ? (
                        <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-500">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {submitStatus.status && (
                                    <div
                                        className={`flex items-center p-4 rounded-md ${submitStatus.status === "success"
                                            ? "bg-green-50 border border-green-200 text-green-700"
                                            : "bg-red-50 border border-red-200 text-red-700"
                                            }`}
                                    >
                                        {submitStatus.status === "success" ? (
                                            <Check className="w-4 h-4 mr-2" />
                                        ) : (
                                            <AlertCircle className="w-4 h-4 mr-2" />
                                        )}
                                        <p>{submitStatus.message}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-md border outline-none border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-md border outline-none border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            placeholder="Your email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Department
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        value={formData.department}
                                        onChange={(e) =>
                                            setFormData({ ...formData, department: e.target.value })
                                        }
                                    >
                                        <option value="customer-service">Customer Service</option>
                                        <option value="technical-support">Technical Support</option>
                                        <option value="sales">Sales</option>
                                        <option value="wholesale">Wholesale</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        placeholder="Your message"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {infoCards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`${card.color} rounded-xl shadow-lg p-6 transform transition-all duration-300 cursor-pointer ${selectedCard === index ? "ring-2 ring-green-500" : ""}`}
                                    onClick={() =>
                                        setSelectedCard(selectedCard === index ? null : index)
                                    }
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="p-3 bg-white rounded-full shadow-md">
                                            {card.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {card.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-3">
                                        {Object.entries(card.content).map(([key, value], idx) => (
                                            <div key={idx} className="ml-4">
                                                <p className="font-medium text-gray-700">{key}:</p>
                                                <p className="text-gray-600 whitespace-pre-line">
                                                    {value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
