import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Components/NavbarMojo";

function MojoLayout () {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MojoLayout