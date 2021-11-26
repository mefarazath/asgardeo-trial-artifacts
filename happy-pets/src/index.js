import React from "react";
import { render } from "react-dom";
import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";

const Index = () => (

    <AuthProvider
        config={ {
            signInRedirectURL: "http://localhost:3000/",
            signOutRedirectURL: "http://localhost:3000/",
            clientID: "gej5ALUpfJQ9CPVNe8nWiASp3tsa",
            serverOrigin: "https://api.asgardeo.io/t/asgard",
            scope: [ "openid","profile", "internal_login" ],
            resourceServerURLs : ["https://apim.choreo.dev/oauth2/token"]
        } }
    >
       <App />
    </AuthProvider>

    // <AuthProvider
    //     config={{
    //         signInRedirectURL: "http://localhost:3000",
    //         signOutRedirectURL: "http://localhost:3000",
    //         clientID: "zUgBjHgrxNRf3SCOsd2AiFWA73Ea",
    //         serverOrigin: "https://dev.api.asgardeo.io/t/aysh",
    //         scope: ["openid", "profile", "internal_login"],
    //         resourceServerURLs : ["https://dev.api.asgardeo.io/t/aysh"]
    //     }}
    //  >
    //     <App />
    // </AuthProvider>
);

render((<Index />), document.getElementById("root"));
