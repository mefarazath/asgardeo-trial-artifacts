import React from "react";
import { render } from "react-dom";
import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";

const Index = () => (
    <AuthProvider
        config={{
            signInRedirectURL: "http://localhost:3000",
            signOutRedirectURL: "http://localhost:3000",
            clientID: "HWCMtYZXTgN3p87n82EEzJTArpIa",
            serverOrigin: "https://api.asgardeo.io/t/playground",
            scope: ["openid", "profile", "internal_login"],
            resourceServerURLs: ["https://sts.choreo.dev", "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev"],
        }}
     >
    <App />
    </AuthProvider>

    // <AuthProvider
    //     config={{
    //         signInRedirectURL: "http://localhost:3000",
    //         signOutRedirectURL: "http://localhost:3000",
    //         clientID: "ZKfWfuLhcxZQeAT6gJp78N8nXbMa",
    //         serverOrigin: "https://dev.api.asgardeo.io/t/authello",
    //         scope: ["openid", "profile", "internal_login"],
    //         resourceServerURLs: ["https://sts.choreo.dev", "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev"],
    //     }}
    // >
    //     <App />
    // </AuthProvider>
);

render((<Index />), document.getElementById("root"));
