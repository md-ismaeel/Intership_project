export const navLinks = [
    { id: 1, path: "/", Label: "HOME" },
    { id: 2, path: "/collections", Label: "SHOP" },
    { id: 3, path: "/about", Label: "ABOUT" },
];

export const createUrlSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphen
        .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
};

export const isActiveClass = ({
    isActive,
}) => `relative text-[12px] cursor-pointer transition-all duration-300 ease-in-out text-gray-900
  ${isActive
        ? "text-orange-400 before:absolute before:left-[-8px] before:top-1/2 before:w-2 before:h-2 before:transform before:-translate-y-1/2 before:opacity-100 before:transition-all before:duration-300 after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out"
        : "text-gray-600 before:absolute before:left-[-8px] before:top-1/2 before:w-2 before:h-2 before:transform before:-translate-y-1/2 before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100 after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:scale-105 active:scale-95"
    }`;

export const collectionsStyle = {
    collectionContainer: `w-[95%] flex flex-col justify-center items-center gap-5`,
    mainDiv: `w-full flex flex-col lg:flex-row justify-between gap-4`,
    childDiv: `relative w-full h-[300px] md:h-[400px] lg:h-[500px] lg:w-1/2 cursor-pointer overflow-hidden group`,
    images: `w-full h-full bg-center transition-transform duration-1000 ease-in-out group-hover:scale-105`,
    categoryType: `absolute top-1/2 left-[40%] text-xl font-medium text-white z-10 uppercase`,
};


export const navStyles = {
    authBtn: `block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase text-[12px] tracking-widest`
  }