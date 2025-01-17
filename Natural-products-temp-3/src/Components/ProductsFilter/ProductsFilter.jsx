import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData, resetData } from "../../Redux/Slice/OrgSlice";
import { Filter, X, ChevronDown, Package, DollarSign, CheckCircle } from "lucide-react";

export default function ProductsFilter() {
    const { data, originalData } = useSelector((state) => state?.Org);
    const dispatch = useDispatch();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const [expandedSection, setExpandedSection] = useState("categories");

    const categories = [...new Set(data?.map((item) => item?.category).filter(Boolean) ?? [])];
    const maxPrice = Math.max(...originalData.map((item) => item.price), 1000);

    const priceRanges = [
        { id: "all", label: "All Prices", range: [0, maxPrice] },
        { id: "under-50", label: "Under $50", range: [0, 50] },
        { id: "50-100", label: "$50 - $100", range: [50, 100] },
        { id: "100-200", label: "$100 - $200", range: [100, 200] },
        { id: "200-500", label: "$200 - $500", range: [200, 500] },
        { id: "over-500", label: "Over $500", range: [500, maxPrice] },
    ];

    useEffect(() => {
        let count = selectedCategories.length + availability.length;
        if (selectedPriceRange !== "all") count++;
        setActiveFiltersCount(count);
    }, [selectedCategories, availability, selectedPriceRange]);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const handleAvailabilityChange = (status) => {
        setAvailability((prev) =>
            prev.includes(status)
                ? prev.filter((item) => item !== status)
                : [...prev, status]
        );
    };

    const handlePriceRangeChange = (rangeId) => {
        setSelectedPriceRange(rangeId);
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    useEffect(() => {
        let filteredProducts = originalData;

        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter((item) =>
                selectedCategories.includes(item.category)
            );
        }

        if (availability.includes("inStock")) {
            filteredProducts = filteredProducts.filter((item) => item.stock > 0);
        }
        if (availability.includes("outOfStock")) {
            filteredProducts = filteredProducts.filter((item) => item.stock === 0);
        }

        const selectedRange = priceRanges.find((range) => range.id === selectedPriceRange);
        if (selectedRange && selectedPriceRange !== "all") {
            filteredProducts = filteredProducts.filter((item) => item.price >= selectedRange.range[0] && item.price <= selectedRange.range[1]);
        }

        dispatch(setData(filteredProducts));
    }, [
        selectedCategories,
        availability,
        selectedPriceRange,
        dispatch,
        originalData,
    ]);

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setAvailability([]);
        setSelectedPriceRange("all");
        dispatch(resetData());
    };

    const FilterSection = ({ title, icon, isExpanded, onToggle, children }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between text-left"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-gray-900 uppercase text-sm font-semibold">
                        {title}
                    </span>
                </div>
                <ChevronDown
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                        }`}
                    size={20}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="p-4 pt-0">{children}</div>
            </div>
        </div>
    );

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-4">
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
                <Filter size={20} />
                {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium animate-pulse">
                        {activeFiltersCount}
                    </span>
                )}
            </button>

            <div
                className={`fixed md:relative inset-0 md:inset-auto bg-white md:bg-transparent transform transition-all duration-300 ease-in-out z-40 ${isFilterOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"
                    } overflow-auto md:overflow-visible
            `}
            >
                <div className="md:hidden flex items-center justify-between p-4 border-b sticky top-14 bg-white z-10">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Filter sections */}
                <div className="p-4 mt-12 lg:mt-0 md:p-0 space-y-4">

                    {/* Category */}
                    <FilterSection
                        title="Categories"
                        icon={<Package size={20} />}
                        isExpanded={expandedSection === "categories"}
                        onToggle={() => toggleSection("categories")}
                    >
                        <div className="grid grid-cols-1 gap-1">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 uppercase ${selectedCategories.includes(category)
                                        ? "bg-black text-white shadow-lg"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* price */}
                    <FilterSection
                        title="Price Range"
                        icon={<DollarSign size={20} />}
                        isExpanded={expandedSection === "price"}
                        onToggle={() => toggleSection("price")}
                    >
                        <div className="space-y-2">
                            {priceRanges.map((range) => (
                                <button
                                    key={range.id}
                                    onClick={() => handlePriceRangeChange(range.id)}
                                    className={`
                                        w-full px-4 py-2 rounded-lg text-sm font-medium
                                        transition-all duration-200 ease-in-out
                                        hover:scale-105 active:scale-95
                                        ${selectedPriceRange === range.id
                                            ? "bg-black text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* availability */}
                    <FilterSection
                        title="Availability"
                        icon={<CheckCircle size={20} />}
                        isExpanded={expandedSection === "availability"}
                        onToggle={() => toggleSection("availability")}
                    >
                        <div className="space-y-2">
                            <button
                                onClick={() => handleAvailabilityChange("inStock")}
                                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 uppercase ${availability.includes("inStock")
                                    ? "bg-green-500 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }
                                `}
                            >
                                In Stock
                            </button>
                            <button
                                onClick={() => handleAvailabilityChange("outOfStock")}
                                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 uppercase ${availability.includes("outOfStock") ? "bg-red-500 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                                `}
                            >
                                Out of Stock
                            </button>
                        </div>
                    </FilterSection>

                    {activeFiltersCount > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-medium text-gray-900">Active Filters</h2>
                                <button
                                    onClick={handleClearFilters}
                                    className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedCategories.map((category) => (
                                    <span
                                        key={category}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm group hover:bg-gray-200 transition-colors"
                                    >
                                        {category}
                                        <button
                                            onClick={() => handleCategoryChange(category)}
                                            className="ml-1 text-gray-400 group-hover:text-gray-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                                {/* ... Other active filters remain the same ... */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
