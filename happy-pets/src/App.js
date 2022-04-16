import "./App.css";
import React, { useState } from "react";
import { AppLayout, DashboardView, LoginView } from "./components";
import { useAuthContext } from "@asgardeo/auth-react";

function App() {
    /** Empty state  */
    const { state, signIn, signOut, httpRequest, getIDToken, requestCustomGrant, getDecodedIDToken } = useAuthContext();

    const [decodedIdToken, setDecodedIdToken] = useState();
    const [insuranceClaimsFromAPI, setInsuranceClaimsFromAPI] = useState(undefined);

    React.useEffect(() => {
        if (!state?.isAuthenticated) {
            return;
        }

        (async () => {
            const idToken = await getIDToken();
            const choreoToken = await exchangeToken(idToken);

            try {
                const username = state.email || state.username;
                const apiResponse = await callAPI(choreoToken, username);
                setInsuranceClaimsFromAPI(apiResponse);
            } catch (error) {
                // Log or use an alert here.
            }
        })();
    }, [state?.isAuthenticated]);


    const exchangeToken = (idToken) => {
        console.log("----   Requesting a token from Choreo ----")
        console.log(idToken);
        const config = {
            tokenEndpoint: 'https://sts.choreo.dev/oauth2/token',
            attachToken: false,
            data: {
                client_id: process.env.REACT_APP_CHOREO_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CHOREO_APP_CLIENT_SECRET,
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                requested_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                scope: 'custom_scope',
                subject_token: idToken,
            },
            id: 'choreo-token-exchange'
        }

        return requestCustomGrant(config).then((response) => {
            console.log(response);
            return response?.access_token;
        }).catch((error) => {
            console.error(error);
        });
    }


    const callAPI = (choreoToken, userIdentifier) => {
        console.log("----   Authenticated User: ", userIdentifier)
        console.log("---- API: ", process.env.REACT_APP_CHOREO_API_URL)
        console.log("----   Calling the API with Bearer: ", choreoToken)


        var data = JSON.stringify({
            "subscriber": userIdentifier
        });

        var config = {
            method: 'post',
            attachToken: false,
            url: 'https://b22217d0-958b-428e-a30b-7206af4b746c-prod.e1-us-east-azure.choreoapis.dev/boio/subscription-manager/1.0.0/subscribe',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + choreoToken
            },
            data: data
        };

        return httpRequest(config)
            .then((response) => {
                console.log("API response: ", response);
                console.log("API response: ", response.status);
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    };

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
            attachToken: true,
            method: "GET",
            url: "https://api.asgardeo.io/t/playground/scim2/Me"
        };

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
            logoutButton={
                <button onClick={() => signOut()}>Logout</button>
            }
        >
            <LoginView
                isAuthenticated={state.isAuthenticated}
                loginButton={
                    <button onClick={() => signIn()}>Login</button>
                }
            />

            <DashboardView
                isAuthenticated={state.isAuthenticated}
                username={state.username}
                email={state.email}
                insuranceClaims={insuranceClaimsFromAPI}
            />
        </AppLayout>
    );
}

export default App;
