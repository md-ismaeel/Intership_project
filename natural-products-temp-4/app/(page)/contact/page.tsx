"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { FormData } from "@/app/Type/Type";
import { companyStats, formFields } from "@/app/Constants/Constants";

export default function ModernContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        company: "",
        preferredContactTime: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            preferredContactTime: "",
            message: "",
        });
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        field: keyof FormData
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-50 px-4 py-12 flex flex-col items-center pt-4"
        >
            <div className="w-full max-w-6xl space-y-6">
                {/* Company Stats */}
                <motion.div
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {/* Stats Column */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-3">Company Metrics</h2>
                        <div className="space-y-4">
                            {companyStats.map(({ icon: Icon, value, label }, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center space-x-4 py-3 border-b last:border-b-0"
                                >
                                    <Icon className="text-blue-600 w-6 h-6" />
                                    <div>
                                        <div className="font-bold text-lg text-gray-900">{value}</div>
                                        <div className="text-gray-500 text-sm">{label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Our Team</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-4">
                                {formFields.slice(0, 4).map(({ field, type, label, options }) => (
                                    <motion.div
                                        key={field}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {label}
                                        </label>
                                        {type === "select" ? (
                                            <select
                                                value={formData[field]}
                                                onChange={(e) => handleInputChange(e, field)}
                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select Time</option>
                                                {options?.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={type}
                                                value={formData[field]}
                                                onChange={(e) => handleInputChange(e, field)}
                                                required
                                                placeholder={label}
                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Message Field */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    value={formData['message']}
                                    onChange={(e) => handleInputChange(e, 'message')}
                                    required
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </motion.div>

                            <motion.button
                                variants={itemVariants}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${submitted
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-gray-800 hover:bg-gray-900"
                                    }`}
                            >
                                {submitted ? "Message Sent!" : "Send Message"}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}