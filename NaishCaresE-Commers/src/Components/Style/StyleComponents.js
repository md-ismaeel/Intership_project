export const navbarStyle = {
    navContainer: `w-full h-14 fixed z-50 flex justify-between items-center bg-green-400 px-10 py-1`,
    logoContainer: `w-[10%] h-[50px] cursor-pointer flex justify-end items-center`,
    navLogoImg: `w-[45px] h-[45px] rounded-full flex justify-center items-center`,
    navUl: `w-[50%] flex justify-center gap-5 items-center text-white text-[18px]`,
    navLeftSec: `w-[30%] flex justify-center items-center gap-6`,
    active: ({ isActive }) => `${isActive ? "text-yellow-400" : "hover:text-gray-300"} font-medium`,
}

export const InputStyle = {
    container: `relative w-full`,
    inputField: `block w-full px-4 h-[45px] text-bas text-gray-800 border rounded-lg appearance-none transition-colors duration-200 focus:outline-none focus:ring-2  ${disabled ? "opacity-50 cursor-not-allowed" : ""} peer placeholder:text-gray-400`,
    eyeBtn: `absolute top-[9px] right-5 cursor-pointer z-10 px-2 py-1`,
    eyeIcon: `text-xl text-gray-500`
}

export const signInStyle = {
    signInSec: `w-full h-auto overflow-y-auto bg-gray-100`,
    signInContainer: `w-full sm:w-[90%] md:max-w-4xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-6 md:px-8 mt-10 mb-10`,
    leftSide: `w-full md:w-1/2 h-auto md:h-screen bg-green-500 text-white flex flex-col items-center justify-center p-8 rounded-md md:rounded-l-xl lg:rounded-l-xl`,
    welcomeBack: `text-3xl font-bold mb-4 text-center md:text-left`,
    desc: `text-md leading-6 text-center md:text-left mb-6`,
    NewToOurPlatform: `bg-green-400 text-white rounded-full px-4 py-2 text-center`,
    navigateLink: `text-blue-800 hover:underline`,
    rightSide: `w-full md:w-1/2 h-auto md:h-screen bg-white flex items-center justify-center px-6 py-8 rounded-md md:rounded-r-xl shadow-lg`,
    form: `w-full max-w-md flex flex-col gap-6`,
    Sign: `text-3xl font-bold text-gray-800 text-center md:text-left`,
    EnterYourDetails: `text-gray-500 mt-2 text-center md:text-left`,
    googleLogoContainer: `flex justify-center items-center gap-2 border border-gray-300 rounded-lg h-12 cursor-pointer hover:shadow-md transition-shadow duration-300`,
    divider: `flex items-center gap-2`,
    span1: `flex-grow h-px bg-gray-300`,
    span2: `text-sm text-gray-800`,
    span3: `flex-grow h-px bg-gray-300`,
    inputBoxContainer: `flex flex-col gap-4`,
    formBtn: `w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${loading && "cursor-not-allowed"}`,
    loader: `absolute left-28 z-10 top-1/2 -translate-y-1/2`,
    forgetBtn: `absolute top-[3rem] right-0 text-sm text-blue-600 cursor-pointer hover:underline`
}