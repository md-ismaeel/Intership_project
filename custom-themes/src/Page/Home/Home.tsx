import { NavLink } from "react-router-dom";
import ThemesPage from "../../Components/Themes/ThemesPage";

export default function Home() {
    return (
        <>
            <ThemesPage />
            <NavLink to={"/customize"}>
                <button className="px-4 py-2 border mt-2 bg-gray-800 text-white font-semibold rounded-sm ml-2 hover:bg-gray-900 active:bg-gray-950">
                    Customize themes
                </button>
            </NavLink>
        </>
    )
}
