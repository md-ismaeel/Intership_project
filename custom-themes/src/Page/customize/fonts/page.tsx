import UpdateButton from "../../../Components/UpdateButton/UpdateButton";
import { ChevronDown } from "lucide-react"
import { useState } from "react";

export default function FontSelector() {
    const [selectedFont, setSelectedFont] = useState("Inter");
    const [isOpen, setIsOpen] = useState(false);

    const fontFamilies = [
        { name: "Inter", class: "font-sans" },
        { name: "Arial", class: "font-sans" },
        { name: "Helvetica", class: "font-sans" },
        { name: "Verdana", class: "font-sans" },
        { name: "Trebuchet MS", class: "font-sans" },
        { name: "Georgia", class: "font-serif" },
        { name: "Garamond", class: "font-serif" },
        { name: "Times New Roman", class: "font-serif" },
        { name: "Courier New", class: "font-mono" },
        { name: "Monaco", class: "font-mono" },
        { name: "Roboto", class: "font-sans" },
        { name: "Open Sans", class: "font-sans" },
        { name: "Lato", class: "font-sans" },
        { name: "Montserrat", class: "font-sans" },
        { name: "Poppins", class: "font-sans" },
        { name: "Ubuntu", class: "font-sans" },
        { name: "Merriweather", class: "font-serif" },
        { name: "Playfair Display", class: "font-serif" },
        { name: "Source Code Pro", class: "font-mono" },
        { name: "Fira Code", class: "font-mono" },
    ];

    const selectedFontFamily = fontFamilies.find((font) => font.name === selectedFont);

    return (
        <section className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Fonts</h2>
                <p className="text-gray-600 text-lg">
                    Choose from over 20 font families to enhance your store's visual style
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col space-y-2 relative">
                    <label className="text-gray-700 font-medium text-lg">
                        Font Family
                    </label>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-left bg-white flex justify-between items-center"
                    >
                        <span
                            className={selectedFontFamily?.class}
                            style={{ fontFamily: selectedFont }}
                        >
                            {selectedFont}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute w-full top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                            {fontFamilies.map((font) => (
                                <button
                                    key={font.name}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${selectedFont === font.name ? "bg-gray-100" : ""
                                        } ${font.class}`}
                                    style={{ fontFamily: font.name }}
                                    onClick={() => {
                                        setSelectedFont(font.name);
                                        setIsOpen(false);
                                    }}
                                >
                                    {font.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                    <p
                        className={`text-xl ${selectedFontFamily?.class}`}
                        style={{ fontFamily: selectedFont }}
                    >
                        This is a preview text in {selectedFont}. The quick brown fox jumps
                        over the lazy dog.
                    </p>
                </div>
            </div>

            <UpdateButton selectedTheme={"true"} />
        </section>
    );
}
