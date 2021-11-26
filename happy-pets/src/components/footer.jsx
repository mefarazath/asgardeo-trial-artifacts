import React from "react";
import AsgardeoLogo from "../assets/images/asgardeo-logo.svg";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="copyright">
                <p>
                    ©
                    <script>document.write(new Date().getFullYear());</script>2021 Happy Pet Insurance |
                    Powered by <img alt="" className="asgardeo-logo" src={ AsgardeoLogo }/>
                </p>
            </div>
        </div>
    );
};
