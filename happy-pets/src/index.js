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
            clientID: "",
            serverOrigin: "",
            scope: ["openid", "profile", "internal_login"],
        }}
     >
        <App />
    </AuthProvider>
);

render((<Index />), document.getElementById("root"));
