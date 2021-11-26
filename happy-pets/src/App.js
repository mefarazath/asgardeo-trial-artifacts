import "./App.css";
import React, { useState } from "react";
import { AppLayout, DashboardView, LoginView } from "./components";
import { useAuthContext } from "@asgardeo/auth-react";
import { AsgardeoSPAClient } from "@asgardeo/auth-react";

function App() {


    /** Empty state  */

    const { state, signIn, signOut, getDecodedIDToken, httpRequest , getIDToken} = useAuthContext();
    const [decodedIdToken, setDecodedIdToken] = useState();
    
    React.useEffect(() => {
        if (!state?.isAuthenticated) {
            return;
        }
        getDecodedIDToken().then((response => {
            setDecodedIdToken(response);
            console.log("Decoded ID Token: ");
            console.log(response);
            console.log("--------Retrieving user profile via SCIM------");
            getUserInfo();
            console.log("--------");

        }));

        getIDToken().then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.error(error);
        });
    }, [state?.isAuthenticated]);

    /**
     * Get the logged in users profile details via Scim2/ME endpoint
     */
    function getUserInfo() {

        if (!state?.isAuthenticated) {
            return;
        }
        const requestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/scim+json"
            },
            method: "GET",
            url: "https://api.asgardeo.io/t/asgard/scim2/Me"
        };
        debugger;
        return httpRequest(requestConfig)
            .then((response) => {
                console.log("SCIM success");
                 console.log(response);
            })
            .catch((error) => {
                console.log("SCIM Error");
                 console.error(error);
            });
    };


    return (
        <AppLayout
            isLoading={state.isLoading}
            isAuthenticated={state.isAuthenticated}
        >
            <LoginView
                isAuthenticated={state.isAuthenticated}
                loginButton={
                    <button onClick={() => signIn()}>Login</button>
                }
            />

            <DashboardView
                isAuthenticated={state.isAuthenticated}
                username={decodedIdToken?.username}
                logoutButton={
                    <button onClick={() => signOut()}>Logout</button>
                }
            />
        </AppLayout>
    );
}

export default App;
