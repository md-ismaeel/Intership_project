import React from "react";
import HeroComponent from "../../Components/HeroComponent/HeroComponent";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";
import Cart from "../../Components/Cart/Cart";
import Category from "../../Components/Category/Category";
import HotSelling from "../../Components/Deals/HotSelling";
import FocusOn from "../../Components/FocusOn/FocusOn";
import TopSelling from "../../Components/Deals/TopDeals";
import Shop from "../../Components/Shop/Shop";
import BestDeals from "../../Components/Deals/BestDeals"

export default function Home() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <ExtraSpace />
            <HeroComponent />
            <Category />
            <HotSelling />
            <FocusOn />
            <TopSelling />
            <Shop />
            <BestDeals />
        </div>
    );
}
