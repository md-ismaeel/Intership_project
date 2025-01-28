import {
  CompanyStatItem,
  ContactTimePreference,
  FormFieldConfig,
} from "@/app/Type/Type";
import { Globe, Clock, Users, Award, Star, Timer } from "lucide-react";


// Navbar data
export const navLinks = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "About", path: "/about" },
  { id: 3, label: "Contact", path: "/contact" },
  { id: 4, label: "Products", path: "/products" },
];


// Contact data
export const companyStats: CompanyStatItem[] = [
  { icon: Users, value: "250+", label: "Team Members" },
  { icon: Globe, value: "15", label: "Global Offices" },
  { icon: Clock, value: "24/7", label: "Support Hours" },
  { icon: Timer, value: "<15 min", label: "Response Time" },
  { icon: Award, value: "12", label: "Industry Awards" },
  { icon: Star, value: "4.8/5", label: "Customer Satisfaction" },
];

export const formFields: FormFieldConfig[] = [
  { field: "name", type: "text", label: "Full Name" },
  { field: "email", type: "email", label: "Business Email" },
  { field: "phone", type: "tel", label: "Phone Number" },
  { field: "company", type: "text", label: "Company Name" },
  {
    field: "preferredContactTime",
    type: "select",
    label: "Preferred Contact Time",
    options: Object.values(ContactTimePreference),
  },
  { field: "message", type: "textarea", label: "Your Message" },
];


// Product details data

export const additionalProductInfo = {
  shipping: {
    method: "Free Standard Shipping",
    estimatedDelivery: "3-5 Business Days",
    freeShippingThreshold: 50,
    details: "Free shipping on orders over $50. Tracked delivery available.",
  },
  warranty: {
    duration: "1 Year Limited",
    coverage: [
      "Manufacturing Defects",
      "Functional Failures",
      "Free Replacement",
    ],
    details:
      "Comprehensive warranty covering manufacturing and functional issues",
  },
  returns: {
    policy: "30-Day Hassle-Free Returns",
    conditions: [
      "Item must be unused",
      "Original packaging intact",
      "Full refund or exchange",
      "Return shipping free for defective items",
    ],
  },
};

export const mockReviews = [
  {
    id: 1,
    username: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely love this product! Exceeded my expectations.",
  },
  {
    id: 2,
    username: "John D.",
    rating: 4,
    date: "1 month ago",
    comment: "Great quality, fast shipping. Minor improvement needed.",
  },
];