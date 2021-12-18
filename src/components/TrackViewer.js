import React from "react";

import { Button, Box, InputLabel, MenuItem, FormControlLabel, FormControl, Select, Radio, RadioGroup, AppBar, Toolbar, Typography } from "@mui/material";

const TrackViewer = () => {
    let years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990]
    const [year, setYear] = React.useState("");
    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const [region, setRegion] = React.useState("atlantic");
    const handleRadioChange = (e) => {
        setRegion(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(region, year);
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ display: "flex", flexDirection: "row" }} position="static">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Storm Tracker
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <RadioGroup sx={{marginLeft: "30px" }} row defaultValue="atlantic" onChange={handleRadioChange}>
                                    <FormControlLabel value="atlantic" control={<Radio color="default" />} label="Atlantic" />
                                    <FormControlLabel value="pacific" control={<Radio color="default" />} label="Pacific" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ width: "250px", marginLeft: "20px", marginRight: "20px", marginTop: "5px" }}>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    sx={{ height: "35px" }}
                                    value={year}
                                    label="year"
                                    onChange={handleYearChange}
                                    required
                                >
                                    {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Button sx={{ marginTop: "3px" }} type="submit" variant="contained" color="secondary">Go</Button>
                        </form>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
}

export default TrackViewer;