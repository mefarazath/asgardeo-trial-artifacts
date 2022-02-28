import React from "react";
import {Footer} from "./footer";
import {Header} from "./header";
import Loader from "react-loader-spinner";

export const AppLayout = (props) => {

    const {
        isAuthenticated,
        isLoading,
        children,
        logoutButton
    } = props;

    return (
        <div className="app-container">
            { isAuthenticated && <Header logoutButton={ logoutButton } /> }
            {
                !isLoading
                    ? (
                        <div className={ `main ${ !isAuthenticated ? " login" : "dashboard" }` }>
                            { children }
                        </div>
                    )
                    : (
                        <div className="main loading">
                            <Loader
                                type="BallTriangle"
                                color="#a660e4"
                                height={100}
                                width={100}
                                timeout={3000}
                            />
                        </div>
                    )
            }

            { isAuthenticated && <Footer/> }
        </div>
    );
};
