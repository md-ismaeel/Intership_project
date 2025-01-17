export const navLinks = [
    { id: 1, path: "/", Label: "HOME" },
    { id: 2, path: "/products", Label: "SHOP" },
    { id: 3, path: "/about", Label: "ABOUT" },
    { id: 5, path: "/contact", Label: "CONTACT" },
];

export const createUrlSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphen
        .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
};

export const isActiveClass = ({
    isActive,
}) =>
    `relative text-[14px] font-semibold transition-all duration-300 ease-in-out ${isActive
        ? "text-green-800 underline underline-offset-4 decoration-green-600"
        : "text-gray-800 hover:text-green-600"
    }`;

export const collectionsStyle = {
    collectionContainer: `w-[95%] flex flex-col justify-center items-center gap-5`,
    mainDiv: `w-full flex flex-col lg:flex-row justify-between gap-4`,
    childDiv: `relative w-full h-[250px] md:h-[430px] lg:h-[400px] rounded-lg lg:w-1/2 cursor-pointer overflow-hidden group`,
    images: `w-full h-full bg-center transition-transform duration-1000 ease-in-out group-hover:scale-105 rounded-lg`,
    categoryType: `absolute top-1/2 left-[40%] text-xl font-medium text-white z-10 uppercase`,
};


export const navStyles = {
    authBtn: `block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase text-[12px] tracking-widest`
}