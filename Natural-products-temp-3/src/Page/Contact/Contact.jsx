import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Globe, Users, MessageCircle, Headphones, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ExtraSpace from '../../Components/ExtraSpace/ExtraSpace';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        department: 'customer-service',
        preferredContact: 'email',
        orderNumber: ''
    });

    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '', email: '', subject: '', message: '',
                department: 'customer-service', preferredContact: 'email', orderNumber: ''
            });
        }, 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    const formFieldVariants = {
        focused: { scale: 1.01 },
        unfocused: { scale: 1 }
    };

    const infoCards = [
        {
            icon: <Mail />,
            title: "Email Contacts",
            content: {
                "Customer Service": "support@organicstore.com",
                "Business Inquiries": "business@organicstore.com",
                "Wholesale": "wholesale@organicstore.com"
            }
        },
        {
            icon: <Phone />,
            title: "Phone Numbers",
            content: {
                "Main Line": "+1 (555) 123-4567",
                "Customer Support": "+1 (555) 234-5678",
                "Wholesale": "+1 (555) 345-6789"
            }
        },
        {
            icon: <MapPin />,
            title: "Locations",
            content: {
                "Main Store": "123 Organic Lane, Nature City, NC 12345",
                "Warehouse": "456 Distribution Ave, Nature City, NC 12346",
                "Pickup Point": "789 Collection Blvd, Nature City, NC 12347"
            }
        },
        {
            icon: <Clock />,
            title: "Hours of Operation",
            content: {
                "Store Hours": "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
                "Customer Support": "Mon - Fri: 8:00 AM - 8:00 PM\nSat: 9:00 AM - 5:00 PM",
                "Warehouse": "Mon - Fri: 7:00 AM - 7:00 PM"
            }
        },
        {
            icon: <Globe />,
            title: "Online Channels",
            content: {
                "Website": "www.organicstore.com",
                "Blog": "blog.organicstore.com",
                "Store Locator": "organicstore.com/locations"
            }
        },
    ];

    return (
        <>
            <ExtraSpace />
            <section className="min-h-screen bg-gradient-to-b py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto mb-16 text-center"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions about our organic products? We're here to help through multiple channels.
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {infoCards.map((card, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white rounded-lg shadow-lg p-6"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-green-600"
                                    >
                                        {card.icon}
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                                </div>
                                <div className="space-y-3">
                                    {Object.entries(card.content).map(([key, value], idx) => (
                                        <motion.div
                                            key={idx}
                                            className="ml-10"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <p className="font-medium text-gray-700">{key}:</p>
                                            <p className="text-gray-600 whitespace-pre-line">{value}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-lg shadow-lg p-8 space-y-6"
                            animate={isSubmitted ? { scale: [1, 1.02, 1] } : {}}
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    variants={formFieldVariants}
                                    animate={focusedField === 'name' ? "focused" : "unfocused"}
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <motion.input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Your name"
                                        whileFocus={{ scale: 1.01 }}
                                    />
                                </motion.div>

                                <motion.div
                                    variants={formFieldVariants}
                                    animate={focusedField === 'email' ? "focused" : "unfocused"}
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <motion.input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Your email"
                                        whileFocus={{ scale: 1.01 }}
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                variants={formFieldVariants}
                                animate={focusedField === 'department' ? "focused" : "unfocused"}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                <motion.select
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    onFocus={() => setFocusedField('department')}
                                    onBlur={() => setFocusedField(null)}
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <option value="customer-service">Customer Service</option>
                                    <option value="technical-support">Technical Support</option>
                                    <option value="sales">Sales</option>
                                    <option value="wholesale">Wholesale</option>
                                    <option value="other">Other</option>
                                </motion.select>
                            </motion.div>

                            <motion.div
                                variants={formFieldVariants}
                                animate={focusedField === 'orderNumber' ? "focused" : "unfocused"}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Number (Optional)</label>
                                <motion.input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
                                    value={formData.orderNumber}
                                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                                    onFocus={() => setFocusedField('orderNumber')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your order number if applicable"
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </motion.div>

                            <motion.div
                                variants={formFieldVariants}
                                animate={focusedField === 'subject' ? "focused" : "unfocused"}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <motion.input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Message subject"
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </motion.div>

                            <motion.div
                                variants={formFieldVariants}
                                animate={focusedField === 'message' ? "focused" : "unfocused"}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <motion.textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Your message"
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </motion.div>

                            <motion.div
                                variants={formFieldVariants}
                                animate={focusedField === 'preferredContact' ? "focused" : "unfocused"}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                                <motion.select
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
                                    value={formData.preferredContact}
                                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                                    onFocus={() => setFocusedField('preferredContact')}
                                    onBlur={() => setFocusedField(null)}
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                    <option value="any">No Preference</option>
                                </motion.select>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors duration-200"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isSubmitted ? 'Message Sent!' : 'Send Message'}
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}