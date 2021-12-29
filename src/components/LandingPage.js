import React from "react";
import { Typography } from "@mui/material";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="landing-page-text">
                <Typography variant="h2" fontWeight={"bold"} component="div">Select the region and year, then click "Go" to view the storm paths!</Typography>
            </div>
        </div>
    );
}

export default LandingPage;