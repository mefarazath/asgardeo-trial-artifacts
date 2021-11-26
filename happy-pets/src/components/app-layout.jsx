import React from "react";
import {Footer} from "./footer";
import {Header} from "./header";
import Loader from "react-loader-spinner";

export const AppLayout = (props) => {

    const {
        isAuthenticated,
        isLoading,
        children
    } = props;

    return (
        <div className="container">
            { isAuthenticated && <Header/> }
            <div className="main">
                {
                    !isLoading
                        ? children
                        : (
                            <Loader
                                type="BallTriangle"
                                color="#a660e4"
                                height={100}
                                width={100}
                                timeout={3000}
                            />
                        )
                }
            </div>
            { isAuthenticated && <Footer/> }
        </div>
    );
};
