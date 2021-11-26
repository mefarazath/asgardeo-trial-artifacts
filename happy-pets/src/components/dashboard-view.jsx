import React from "react";
import WavingHand from "../assets/images/waving-hand.png";
import Billing from "../assets/images/billing.png";
import Support from "../assets/images/support.png";
import Policy from "../assets/images/policy.png";

export const DashboardView = (props) => {

    const {
        isAuthenticated,
        displayName,
        username,
        email,
        logoutButton,
        billingPortalURL,
        supportPortalURL,
        policyPortalURL
    } = props;

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="dashboard-wrapper">
            <div className="greeting">
                <h1>
                    <img src={ WavingHand } alt="waving hand"/>
                    Hi { displayName || username || email }!
                </h1>
                <h2>Welcome to <strong>Happy Pet Insurance</strong> Dashboard</h2>

                <p>Click on the following tiles to manage navigate to each of the apps.</p>
            </div>
            <div className="cards">
                <div className="card app-card" onClick={ () => window.open(billingPortalURL) }>
                    <img alt="" class="feature-card-image" src={ Billing }/>
                    <div class="feature-card-header">
                        <div class="feature-card-title">Billing</div>
                        <div class="feature-card-subtitle">Go to the billing portal to explore the invoices.</div>
                    </div>
                </div>

                <div className="card app-card" onClick={ () => window.open(supportPortalURL) }>
                    <img alt="" class="feature-card-image" src={ Support }/>
                    <div class="feature-card-header">
                        <div class="feature-card-title">Customer Support</div>
                        <div class="feature-card-subtitle">Talk to our agents regarding any issues.</div>
                    </div>
                </div>

                <div className="card app-card" onClick={ () => window.open(policyPortalURL) }>
                    <img alt="" class="feature-card-image" src={ Policy }/>
                    <div class="feature-card-header">
                        <div class="feature-card-title">Policies</div>
                        <div class="feature-card-subtitle">View and manage your policies and contracts.</div>
                    </div>
                </div>
            </div>
            { logoutButton }
        </div>
    );
};
