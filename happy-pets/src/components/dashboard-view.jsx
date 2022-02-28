import React from "react";
import WavingHand from "../assets/images/waving-hand.png";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Loader from "react-loader-spinner";

export const DashboardView = (props) => {

    const {
        isAuthenticated,
        displayName,
        username,
        email,
        insuranceClaims
    } = props;

    if (!isAuthenticated) {
        return null;
    }

    const resolveClaimStatus = (status) => {

        if (status === "COMPLETED") {
            return <Badge bg="success">{ status }</Badge>;
        }

        if (status === "PENDING") {
            return <Badge bg="warning" text="dark">{ status }</Badge>;
        }

        return <Badge bg="light" text="dark">{ status }</Badge>
    }

    return (
        <div className="dashboard-wrapper">
            <div className="greeting jumbotron">
                <h1>
                    <img src={ WavingHand } alt="waving hand"/>
                    Hi { displayName || username || email }!
                </h1>
                <hr />
                <h3>Welcome to <strong>Happy Pet Insurance</strong> Dashboard</h3>
            </div>

            <h3 className="mb-4">Here's a summary of your claims</h3>

            {
                insuranceClaims
                    ? (
                        <div className="claims">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Ref #</th>
                                        <th>Submition Date</th>
                                        <th>Amount</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        insuranceClaims.map((claim, index) => (
                                            <tr key={ index }>
                                                <td>{ claim.referenceId }</td>
                                                <td>{ claim.submittedDate }</td>
                                                <td>{ claim.amount }</td>
                                                <td>{ claim.category }</td>
                                                <td>{ resolveClaimStatus(claim.status) }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    )
                    : (
                        <Loader
                            type="ThreeDots"
                            color="#a660e4"
                            height={100}
                            width={100}
                            timeout={3000}
                        />
                    )
            }
        </div>
    );
};
