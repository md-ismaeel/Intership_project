import React, { useState } from "react";
import { motion } from "motion/react"
import { NavLink } from "react-router-dom";
import { ChevronDown, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";

export default function About() {
    const [expandedValue, setExpandedValue] = useState(null);
    const [activeTeamMember, setActiveTeamMember] = useState(null);
    const [showMissionDetails, setShowMissionDetails] = useState(false);

    const team = [
        {
            name: "John Doe",
            role: "CEO",
            bio: "Visionary leader with 15+ years of industry experience",
            contactInfo: { email: "john@example.com", phone: "+1 234 567 890" },
            image: `https://assets.bbhub.io/media/sites/8/2023/11/JF-headshot.png`,
        },
        {
            name: "Jane Smith",
            role: "CTO",
            bio: "Tech innovator specializing in AI and cloud solutions",
            contactInfo: { email: "jane@example.com", phone: "+1 234 567 891" },
            image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXHDWDsMtv9vnLd3Sm9DPnIw0a6X5ZhU5gQ&s`
        },
        {
            name: "Mike Johnson",
            role: "Designer",
            bio: "Award-winning designer with a passion for UX",
            contactInfo: { email: "mike@example.com", phone: "+1 234 567 892" },
            image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJVbmfTFu56bJFFPV0yXpyYtEwM4-FpWJ8oQ&s`
        },
        {
            name: "Sarah Williams",
            role: "Developer",
            bio: "Full-stack developer and open source contributor",
            contactInfo: { email: "sarah@example.com", phone: "+1 234 567 893" },
            image: `https://lighthouse.mq.edu.au/__data/assets/image/0004/917194/women-ceo-tile700x400.jpg`
        },
    ];

    const values = [
        {
            title: "Innovation",
            description: "Pushing boundaries and embracing new technologies",
            details: "We invest heavily in R&D and encourage creative problem-solving across all teams. Our innovation lab constantly experiments with emerging technologies to stay ahead of the curve.",
        },
        {
            title: "Quality",
            description: "Delivering excellence in everything we create",
            details: "Our rigorous quality assurance process ensures that every product and service meets the highest standards. We believe in getting it right the first time.",
        },
        {
            title: "Integrity",
            description: "Building trust through honest partnerships",
            details: "We maintain transparent communication with all stakeholders and always prioritize long-term relationships over short-term gains.",
        },
    ];

    return (
        <>
            <ExtraSpace />
            <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto text-center"
                >
                    <h1 className="text-4xl font-bold text-gray-900">
                        About Us
                    </h1>
                    <motion.p
                        className="mt-3 text-xl text-gray-500 sm:mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        We're passionate about creating amazing experiences
                    </motion.p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-16 max-w-7xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <motion.div
                            className="space-y-4 cursor-pointer"
                            onClick={() => setShowMissionDetails(!showMissionDetails)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                Our Mission
                                <ChevronDown
                                    className={`transition-transform ${showMissionDetails ? "rotate-180" : ""
                                        }`}
                                    size={24}
                                />
                            </h2>
                            <p className="text-lg text-gray-600">
                                We strive to deliver innovative solutions that transform
                                businesses and enhance user experiences.
                            </p>
                            {showMissionDetails && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="text-gray-600 mt-4"
                                >
                                    <p>Our comprehensive approach involves:</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-2">
                                        <li>Cutting-edge technology implementation</li>
                                        <li>User-centered design principles</li>
                                        <li>Agile development methodology</li>
                                        <li>Continuous innovation and improvement</li>
                                    </ul>
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div
                            className="bg-gray-200 h-64 rounded-lg overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                src="https://hasilbumindo.com/wp-content/uploads/2023/04/dl.beatsnoop.com-3000-LOzBPyrdI8-scaled.jpg"
                                alt="Mission"
                                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 max-w-7xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 * index }}
                                className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transform transition-all duration-300 ${expandedValue === index ? "ring-2 ring-blue-500 min--[100px]" : "h-[120px]"}`}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-between">
                                    {value.title}
                                    <ChevronDown
                                        className={`transition-transform ${expandedValue === index ? "rotate-180" : ""}`}
                                        size={20}
                                    />
                                </h3>
                                <p className="text-gray-600">{value.description}</p>
                                {expandedValue === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`mt-4 text-gray-600 border-t pt-4`}
                                    >
                                        {value.details}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 max-w-7xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 * index }}
                                className={`bg-white p-6 rounded-lg shadow-md text-center cursor-pointer transform transition-all duration-300 ${activeTeamMember === index ? "ring-2 ring-blue-500 min-h-[220px]" : "h-[220px]"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                onClick={() =>
                                    setActiveTeamMember(activeTeamMember === index ? null : index)
                                }
                            >
                                <img
                                    src={member.image}
                                    className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 transition-transform hover:scale-110 duration-300"
                                    alt={member.name}
                                />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600">{member.role}</p>
                                {activeTeamMember === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 text-gray-600 border-t pt-4"
                                    >
                                        <p className="mb-3">{member.bio}</p>
                                        <div className="space-y-2 text-sm">
                                            <p className="flex items-center justify-center gap-2">
                                                <Mail size={16} />
                                                {member.contactInfo.email}
                                            </p>
                                            <p className="flex items-center justify-center gap-2">
                                                <Phone size={16} />
                                                {member.contactInfo.phone}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 max-w-7xl mx-auto text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We'd love to hear from you and discuss how we can help.
                    </p>
                    <NavLink
                        to="/contact"
                        className="group inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover:gap-4"
                    >
                        Contact Us
                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </NavLink>
                </motion.div>
            </section>
        </>
    );
}
