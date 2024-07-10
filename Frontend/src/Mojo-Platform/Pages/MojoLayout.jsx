import React from "react";
import { Outlet } from "react-router-dom";

import Title from "../Components/Title";
import Navbar from "../Components/NavbarMojo";
import MojoSearch from "../Components/MojoSearch";

function MojoLayout () {
    return (
        <>
            <Title/>
            <div className="w-full h-auto fixed top-0">
                <Navbar />
                <div className="w-full h-[60px] sm:hidden flex justify-center items-center">
                    <MojoSearch />
                </div>
            </div>
            <div className="h-[100vh] flex justify-center items-end">
                <Outlet />
            </div>
        </>
    )
}

export default MojoLayout