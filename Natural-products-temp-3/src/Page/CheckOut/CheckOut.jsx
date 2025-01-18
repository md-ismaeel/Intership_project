import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft, ArrowRight, CreditCard, Truck, CheckCircle, Home, Shield } from "lucide-react";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";

export default function Checkout() {
    const { cart } = useSelector((state) => state?.Org);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        shipping: { firstName: "", lastName: "", email: "", address: "", city: "", state: "", zipCode: "", phone: "", },
        payment: { cardNumber: "", cardName: "", expiry: "", cvv: "" },
    });


    const handleInputChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const calculateTotal = () => {
        const subtotal = cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
        const shipping = 10;
        const tax = subtotal * 0.08;
        return {
            subtotal, shipping, tax, total: subtotal + shipping + tax,
        };
    };

    const steps = [
        { number: 1, title: "Shipping" },
        { number: 2, title: "Payment" },
        { number: 3, title: "Review" },
    ];

    const renderStepIndicator = () => (
        <div className="w-full max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
                {steps.map((step) => (
                    <div key={step.number} className="flex flex-col items-center gap-2">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step.number
                                ? "bg-green-600 text-white"
                                : "bg-gray-200"
                                } transition-colors duration-300`}
                        >
                            {step.number}
                        </div>
                        <span className="text-sm font-medium">{step.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderShippingForm = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.shipping.firstName}
                    onChange={(e) =>
                        handleInputChange("shipping", "firstName", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.shipping.lastName}
                    onChange={(e) =>
                        handleInputChange("shipping", "lastName", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
            </div>
            <input
                type="email"
                placeholder="Email Address"
                value={formData.shipping.email}
                onChange={(e) => handleInputChange("shipping", "email", e.target.value)}
                className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
            />
            <input
                type="text"
                placeholder="Street Address"
                value={formData.shipping.address}
                onChange={(e) =>
                    handleInputChange("shipping", "address", e.target.value)
                }
                className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
            />
            <div className="grid grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="City"
                    value={formData.shipping.city}
                    onChange={(e) =>
                        handleInputChange("shipping", "city", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
                <input
                    type="text"
                    placeholder="State"
                    value={formData.shipping.state}
                    onChange={(e) =>
                        handleInputChange("shipping", "state", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
                <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.shipping.zipCode}
                    onChange={(e) =>
                        handleInputChange("shipping", "zipCode", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
            </div>
            <input
                type="tel"
                placeholder="Phone Number"
                value={formData.shipping.phone}
                onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
                className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
            />
        </div>
    );

    const renderPaymentForm = () => (
        <div className="space-y-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.payment.cardNumber}
                    onChange={(e) =>
                        handleInputChange("payment", "cardNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
                <CreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Cardholder Name"
                value={formData.payment.cardName}
                onChange={(e) =>
                    handleInputChange("payment", "cardName", e.target.value)
                }
                className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
            />
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.payment.expiry}
                    onChange={(e) =>
                        handleInputChange("payment", "expiry", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
                <input
                    type="text"
                    placeholder="CVV"
                    value={formData.payment.cvv}
                    onChange={(e) => handleInputChange("payment", "cvv", e.target.value)}
                    className="w-full px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300"
                />
            </div>
        </div>
    );

    const renderOrderSummary = () => {
        const { subtotal, shipping, tax, total } = calculateTotal();
        return (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-medium">Order Summary</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderReview = () => (
        <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Home className="w-5 h-5" />
                    <h3 className="font-medium">Shipping Address</h3>
                </div>
                <div className="text-sm text-gray-600">
                    {formData.shipping.firstName} {formData.shipping.lastName}
                    <br />
                    {formData.shipping.address}
                    <br />
                    {formData.shipping.city}, {formData.shipping.state}{" "}
                    {formData.shipping.zipCode}
                </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    <h3 className="font-medium">Payment Method</h3>
                </div>
                <div className="text-sm text-gray-600">
                    Card ending in {formData.payment.cardNumber.slice(-4)}
                    <br />
                    {formData.payment.cardName}
                </div>
            </div>
            {renderOrderSummary()}
        </div>
    );

    return (
        <>
            <ExtraSpace />
            <section className="min-h-screen bg-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    {renderStepIndicator()}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-xl">
                                {currentStep === 1 && renderShippingForm()}
                                {currentStep === 2 && renderPaymentForm()}
                                {currentStep === 3 && renderReview()}
                            </div>

                            <div className="flex justify-between">
                                {currentStep > 1 && (
                                    <button
                                        onClick={() => setCurrentStep((prev) => prev - 1)}
                                        className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-md outline-none hover:border-black transition-colors duration-300"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Back</span>
                                    </button>
                                )}
                                {currentStep < 3 ? (
                                    <button
                                        onClick={() => setCurrentStep((prev) => prev + 1)}
                                        className="ml-auto flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md outline-none hover:bg-green-700 transition-colors duration-300"
                                    >
                                        <span>Continue</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => console.log("Place order")}
                                        className="ml-auto flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md outline-none hover:bg-green-900 transition-colors duration-300"
                                    >
                                        <span>Place Order</span>
                                        <CheckCircle className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                            {renderOrderSummary()}
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Truck className="w-5 h-5" />
                                    <div>
                                        <h3 className="font-medium">Free Shipping</h3>
                                        <p className="text-sm text-gray-600">2-4 Business Days</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5" />
                                    <div>
                                        <h3 className="font-medium">Secure Checkout</h3>
                                        <p className="text-sm text-gray-600">SSL Encrypted Payment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
