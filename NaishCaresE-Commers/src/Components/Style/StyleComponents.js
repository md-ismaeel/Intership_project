export const navbar = {
    navContainer: `w-full h-14 fixed z-50 flex justify-between items-center bg-green-400 px-10 py-1`,
    logoContainer: `w-[10%] h-[50px] cursor-pointer flex justify-end items-center`,
    navLogoImg: `w-[45px] h-[45px] rounded-full flex justify-center items-center`,
    navUl: `w-[50%] flex justify-center gap-5 items-center text-white text-[18px]`,
    navLeftSec: `w-[30%] flex justify-center items-center gap-6`,
    active: ({ isActive }) => `${isActive ? "text-yellow-400" : "hover:text-gray-300"} font-medium`,
}