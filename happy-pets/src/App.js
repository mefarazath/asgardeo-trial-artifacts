import "./App.css";
import React, { useState } from "react";
import { AppLayout, DashboardView, LoginView } from "./components";
import { useAuthContext } from "@asgardeo/auth-react";

function App() {
    /** Empty state  */
    const { state, signIn, signOut, httpRequest, getIDToken, requestCustomGrant, getDecodedIDToken } = useAuthContext();
    const [decodedIdToken, setDecodedIdToken] = useState();

    React.useEffect(() => {
        if (!state?.isAuthenticated) {
            return;
        }

        (async () => {
            const idToken = await getIDToken();
            const choreoToken = await exchangeToken(idToken);
            const apiResponse = await callAPI(choreoToken);
            state.apiResponse = apiResponse.data;
            console.log(state.apiResponse);
        })();
    }, [state?.isAuthenticated]);


    const exchangeToken = (idToken) => {
        console.log("----   Requesting a token from Choreo ----")
        const config = {
            tokenEndpoint: 'https://sts.choreo.dev/oauth2/token',
            attachToken: false,
            data: {
                client_id: 'QmkcMtDgMAuoL9cnNNuC6XDTSQEa',
                client_secret: 'WbD8UabmY9Ueh338JPmG81fEPxIa',
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                requested_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                scope: 'custom_scope',
                subject_token: idToken,
            },
            id: 'choreo-token-exchange'
        }

        return requestCustomGrant(config).then((response) => {
            // console.log(response?.data?.access_token);
            return response?.data?.access_token;
        }).catch((error) => {
            console.error(error);
        });
    }


    const callAPI = (choreoToken) => {
        console.log("----   Calling the API with Bearer: ", choreoToken)
        const requestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/scim+json",
                "Authorization": "Bearer " + choreoToken
            },
            attachToken: false,
            method: "GET",
            url: "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev/ytfv/greetings/1.0.0/?name=farasath",
        };

        return httpRequest(requestConfig)
            .then((response) => {
                // console.log("API response: ", response);
                return response;
            })
            .catch((error) => {
                console.log("API error: ", error);
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
                logoutButton={
                    <button onClick={() => signOut()}>Logout</button>
                }
            />
        </AppLayout>
    );
}

export default App;
