import React from 'react';
import "./custom.css";
import logo from "../../static/logo.png"

function Loader() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <img src={logo} alt="logo" width="100px" />
            <p className="mt-2 text-xl font-semibold italic">Not Instagram</p>
            {/* <span className="non-italic">&#128540;</span> */}
            <span className="loader mt-10"></span>
        </div>
    )
}

export default Loader