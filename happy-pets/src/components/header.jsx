import React from "react"
import HappyPetLogo from "../assets/images/logo-full.svg";

export const Header = (props) => {

    const {
        logoutButton
    } = props;

    return (
        <div className="header">
            <img alt="happy-pet-logo" src={ HappyPetLogo }/>
            { logoutButton }
        </div>
    )
};
