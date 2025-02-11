import img from "../../assets/posing.jpg";
import img1 from "../../assets/360.jpg";
import img2 from "../../assets/young.avif";
import ThemeCard from "./ThemeCard";

export default function ThemesPage() {
    const custom_data = [img, img1, img2];

    return (
        <>
            <section className="w-full h-auto flex justify-between items-center px-2 pt-14">
                {custom_data.map((item, i) => <ThemeCard key={i} image={item} />)}
            </section>
        </>
    );
}
