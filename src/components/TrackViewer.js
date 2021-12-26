import React from "react";
import { Button, Box, InputBase, MenuItem, FormControlLabel, FormControl, Select, Radio, RadioGroup, AppBar, Toolbar, Typography, Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Help } from '@mui/icons-material';

import Legend from "./Legend";

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
    const handleRegionChange = (e) => {
        setRegion(e.target.value);
    }

    const [frameSrc, setFrameSrc] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setFrameSrc(`./tracks/hurricane_tracks_${region}_${year}.html`);
        // DEPLOYMENT PATH: `./tracks/hurricane_tracks_${region}_${year}.html`
        // DEV PATH: `./hurricane-tracker/tracks/hurricane_tracks_${region}_${year}.html`
        // I don't know why I have to change the path when I open the site in localhost.
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ display: "flex", flexDirection: "row" }} position="static">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Hurricane Tracker
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl sx={{ marginLeft: "30px", marginTop: "9px" }}>
                                <RadioGroup row defaultValue="atlantic" onChange={handleRegionChange}>
                                    <FormControlLabel value="atlantic" control={<Radio color="default" />} label="Atlantic" />
                                    <FormControlLabel value="eastpacific" control={<Radio color="default" />} label="East Pacific" />
                                    <FormControlLabel value="westpacific" control={<Radio color="default" />} label="West Pacific" />
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
                    <Help sx={{ marginTop: "20px", cursor: "pointer" }} onClick={() => handleClickOpen()} />
                </AppBar>
            </Box>
            {frameSrc === "" ? <Typography variant="h2" component="div" sx={{ color: "white", textAlign: "center", marginTop: "120px" }}>Select the region and year, then click "Go" to view the storm paths!</Typography> : <iframe src={frameSrc} title="frame" width={"100%"} sandbox="allow-scripts"></iframe>}
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ height: "100vh" }}
            >
                <Legend />
            </Dialog>
        </React.Fragment>
    );
}

export default TrackViewer;