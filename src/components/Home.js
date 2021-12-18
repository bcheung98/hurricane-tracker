import React from "react";
import "../css/Home.css";

import { Button, Box, InputLabel, MenuItem, FormControlLabel, FormControl, FormLabel, Select, Radio, RadioGroup } from "@mui/material";

const Home = () => {

    let years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990]
    const [year, setYear] = React.useState("");
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <div className="home-root">
            <form className="form-root">
                <FormControl fullWidth>
                    <FormLabel component="legend">Region</FormLabel>
                    <RadioGroup defaultValue="atlantic" className="region-select">
                        <FormControlLabel value="atlantic" control={<Radio />} label="Atlantic" />
                        <FormControlLabel value="pacific" control={<Radio />} label="Pacific" />
                    </RadioGroup>
                </FormControl>
                <Box sx={{ maxWidth: 250 }} className="year-select">
                    <FormControl fullWidth>
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={year}
                            label="year"
                            onChange={handleYearChange}
                            required
                        >
                            {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained">Go</Button>
            </form>
        </div>
    );
}

export default Home;