import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { setData } from "../../Redux/Slice/OrgSlice";

const categoryIcons = {
    beauty: `https://img.pikbest.com/png-images/20240922/woman-face-beauty-logo-design-template-vector-illustration_10875002.png!w700wp`,
    groceries: `https://img.freepik.com/premium-vector/supermarket-logo-template-design_23-2148469238.jpg?semt=ais_hybrid`,
    furniture: `https://static.vecteezy.com/system/resources/thumbnails/007/410/276/small/furniture-logo-design-vector.jpg`,
    fragrances: `https://mir-s3-cdn-cf.behance.net/project_modules/1400/2e191e180187263.6506ba020a480.png`,
};

export default function Category() {
    const { data, originalData } = useSelector((state) => state?.Org);
    const categories = Array.from(new Set(data?.map((item) => item.category).filter(Boolean)) ?? []);

    const dispatch = useDispatch();
    const navigator = useNavigate()



    function handleFilterByCategory(newCat) {
        const filtered = originalData?.filter((item) => item.category === newCat);
        dispatch(setData(filtered))
        navigator("/products")
    }

    return (
        <>
            <h1 className="mt-10 mb-2 uppercase text-sm tracking-widest ml-5 font-semibold">Top <span className='text-yellow-500 ml-2 md:ml-0'>Category</span> </h1>
            <section className="w-full flex justify-center items-center px-5">
                <div className="w-full min-h-[300px] flex flex-col md:flex-row items-center justify-between px-10 border-b-2 bg-green-50 rounded-md">
                    {categories.map((category, index) => {
                        // Get the icon URL for the category, or default to a placeholder image if not found
                        const iconUrl = categoryIcons[category.toLowerCase()] || "";

                        return (
                            <li
                                key={index}
                                onClick={() => handleFilterByCategory(category)}
                                className="list-none flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors"
                            >
                                <img
                                    src={iconUrl}
                                    alt={category}
                                    className="w-32 h-32 bg-center rounded-full transition-all hover:scale-110 duration-500"
                                />
                                <span className="text-sm font-medium uppercase tracking-widest">{category}</span>
                            </li>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
