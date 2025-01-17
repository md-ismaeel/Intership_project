import React from "react";
import HeroComponent from "../../Components/HeroComponent/HeroComponent";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";
import Cart from "../../Components/Cart/Cart";
import Category from "../../Components/Category/Category";
import FanFavorites from "../../Components/Deals/FanFavorite";
import SweetDeals from "../../Components/Deals/SweetDeals";

export default function Home() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <ExtraSpace />
            <HeroComponent />
            <Category />
            <FanFavorites />
            <SweetDeals />
        </div>
    );
}