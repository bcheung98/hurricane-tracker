import React from "react";

import { Button, Box, InputBase, MenuItem, FormControlLabel, FormControl, Select, Radio, RadioGroup, AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "white",
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,12,255,.25)',
            backgroundColor: "white",
        },
    },
}));

const TrackViewer = () => {

    // Generates an array of numbers
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

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
                            <FormControl sx={{ marginLeft: "30px", marginTop: "9px" }}>
                                <RadioGroup row defaultValue="atlantic" onChange={handleRadioChange}>
                                    <FormControlLabel value="atlantic" control={<Radio color="default" />} label="Atlantic" />
                                    <FormControlLabel value="pacific" control={<Radio color="default" />} label="Pacific" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: "100px" }} variant="standard">

                                <Select
                                    value={year}
                                    onChange={handleYearChange}
                                    displayEmpty
                                    input={<BootstrapInput />}
                                    required
                                >
                                    <MenuItem value="">
                                        <em>Year</em>
                                    </MenuItem>
                                    {range(1990, 2021, 1).reverse().map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Button sx={{ marginTop: "12px", marginLeft: "10px" }} type="submit" variant="contained" color="secondary">Go</Button>
                        </form>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
}

export default TrackViewer;