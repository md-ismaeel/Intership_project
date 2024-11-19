import React, { useState } from "react";
import { user_data } from "../../constants";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { stylesCss_homePage } from "../../Components/StyleCss";

export default function Home() {
    const [users, setUsers] = useState(user_data);

    return (
        <>
            <section className={stylesCss_homePage.sectionCss}>
                <h1 className={stylesCss_homePage.profileName}>
                    Profile Names <FaLongArrowAltRight className="mt-1" />
                </h1>
                <ul className={stylesCss_homePage.ul}>
                    {users && users.length > 0
                        ? users.map((user) => (
                            <NavLink to={`/user-details/${user.id}`} key={user.id}>
                                <li className={stylesCss_homePage.userNameCss}>{user?.name}</li>
                            </NavLink>
                        ))
                        : "No User Available"}
                </ul>
            </section>
        </>
    );
}
