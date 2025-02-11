import ToggleButton from "../../../Components/ToggleButton/ToggleButton";
import UpdateButton from "../../../Components/UpdateButton/UpdateButton";

export default function advanced() {
    const sectionData = [
        {
            title: "Add to bag button",
            des: "Show add button on homepage & category page products for seamless checkout",
        },
        {
            title: "Custom CSS",
            des: "Add custom CSS to your ecommers store.",
        },
        {
            title: `Stickey "Buy Now" button (Mobile Only)`,
            des: "Boos conversation & make checkout faster with a stickey buy now button on the product page",
        },
    ];
    return (
        <>
            <section className="w-[75%] h-full flex flex-col justify-center items-center gap-5">
                {sectionData.map((item) => <ToggleButton key={item.title} title={item.title} description={item.des} />)}
                <UpdateButton selectedTheme={"true"} />
            </section>
        </>
    )
}
