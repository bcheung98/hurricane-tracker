import React from "react";
import { Typography, DialogTitle, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { Square, Circle } from '@mui/icons-material';

// Following code to create an SVG triangle is from https://stackblitz.com/edit/react-triangle-svg
const Triangle = ({ w = '20', h = '20', direction = 'right', color = '#44a6e8' }) => {

    const points = {
        top: [`${w / 2},0`, `0,${h}`, `${w},${h}`],
        right: [`0,0`, `0,${h}`, `${w},${h / 2}`],
        bottom: [`0,0`, `${w},0`, `${w / 2},${h}`],
        left: [`${w},0`, `${w},${h}`, `0,${h / 2}`],
    }

    return (
        <svg width={w} height={h}>
            <polygon points={points[direction].join(' ')} fill={color} />
        </svg>
    )
}

const Legend = () => {

    const iconColor = "silver";

    return (
        <div style={{ backgroundColor: "rgb(32, 32, 32)", color: "rgb(250, 250, 250)" }}>
            <DialogTitle>
                <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>Map key</Typography>
            </DialogTitle>
            <Divider sx={{ backgroundColor: "lightgray" }} />
            <List>
                <ListItem>
                    <ListItemText primary={<Typography variant="h6" sx={{ textAlign: "center" }}>Saffir-Simpson scale</Typography>} />
                </ListItem>
                <ListItem>
                    <Square className="legend-color" sx={{ color: "#5EBAFF" }} />
                    <ListItemText primary={<Typography variant="body1">Tropical depression (≤38 mph, ≤62 km/h)</Typography>} className="legend-text-sshws" />
                </ListItem>
                <ListItem>
                    <Square className="legend-color" sx={{ color: "#00FAF4" }} />
                    <ListItemText primary={<Typography variant="body1">Tropical storm (39–73 mph, 63–118 km/h)</Typography>} className="legend-text-sshws" />
                </ListItem>
                <ListItem>
                    <Square className="legend-color" sx={{ color: "#41C732" }} />
                    <ListItemText primary={<Typography variant="body1">Category 1 (74–95 mph, 119–153 km/h)</Typography>} className="legend-text-sshws" />
                </ListItem>
                <ListItem>
                    <Square className="legend-color" sx={{ color: "#FFD621" }} />
                    <ListItemText primary={<Typography variant="body1">Category 2 (96–110 mph, 154–177 km/h)</Typography>} className="legend-text-sshws" />
                </ListItem>
                <ListItem>
                    <Square className="legend-color" sx={{ color: "#FF8F20" }} />
                    <ListItemText primary={<Typography variant="body1">Category 3 (111–129 mph, 178–208 km/h)</Typography>} className="legend-text-sshws" />
                </ListItem>
                <ListItem>
                    <Square className="legend-color" sx={{ color: "#FF6060" }} />
                    <ListItemText primary={<Typography variant="body1">Category 4 (130–156 mph, 209–251 km/h)</Typography>} className="legend-text-sshws" />
                </ListItem>
                <ListItem>
                    <Square className="legend-color" sx={{ color: "#C464D9" }} />
                    <ListItemText primary={<Typography variant="body1">Category 5 (≥157 mph, ≥252 km/h)</Typography>} className="legend-text-sshws" />
                </ListItem>
                <ListItem>
                    <ListItemText primary={<Typography variant="h6" sx={{ textAlign: "center" }}>Storm type</Typography>} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Circle sx={{ color: iconColor }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1">Tropical cyclone</Typography>} className="legend-text-storm-type" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Square sx={{ color: iconColor }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1">Subtropical cyclone</Typography>} className="legend-text-storm-type" />
                </ListItem>
                <ListItem>
                    <ListItemIcon sx={{ marginLeft: "2px", marginBottom: "2px" }}>
                        <Triangle direction="top" color={iconColor} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1">Extratropical cyclone / Remnant low / Tropical disturbance</Typography>} sx={{ marginLeft: "-20px" }} />
                </ListItem>
            </List>
        </div>
    )
}

export default Legend;