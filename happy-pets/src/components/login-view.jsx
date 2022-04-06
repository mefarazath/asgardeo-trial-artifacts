import React from "react";
import HappyPetLogo from "../assets/images/happy-pets-logo-alt.png";
import GuardioLogo from "../assets/images/guardio-logo-light.svg";
import AsgardeoLogo from "../assets/images/asgardeo-logo.svg";

export const LoginView = (props) => {

    const {
        isAuthenticated,
        loginButton
    } = props;

    if (isAuthenticated === true) {
        return null;
    }

    return (
        <div className="login-card-wrapper">
            <h1 color="black"><b>Insure your Pet's Health</b></h1>
            <h2>Happy pet, happy life</h2>
            <div className="card login-card">
                <img alt="" className="happy-pet-logo" src={ HappyPetLogo }/>
                {
                    isAuthenticated !== undefined
                        ? (
                            <>
                                <React.Fragment>
                                    <h3>Login to your Account</h3>
                                    { loginButton }
                                </React.Fragment>
                            </>
                        )
                        : (
                            <React.Fragment>
                            <h3>Login to your Account</h3>
                            <p className="login-helper-text">
                                Let's add a button below to enable login using{ " " }
                                <img alt="" className="asgardeo-logo" src={ AsgardeoLogo }/>
                            </p>
                        </React.Fragment>
                        )
                }
                <br/>
            </div>
            <p>Powered by <img width="90" height="21.26" alt="" className="asgardeo-logo" src={ GuardioLogo }/></p>
        </div>
    );
};
