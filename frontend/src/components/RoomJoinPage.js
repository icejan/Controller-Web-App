import React, { Component, useState } from 'react';
import { TextField, Button, Grid, Typography} from "@mui/material";
import { Link } from "react-router-dom";

function RoomJoinPage (props) {

    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");

    const handleTextFieldChange = (e) => {
        setRoomCode (event.target.value)
    }

    const roomButtonPressed = () => {
        console.log(roomCode)
    }

    return <Grid container spacing={1} align="center">
        <Grid item xs={12}>
            <Typography variant ="h4" component="h4">
                Join a Room
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField 
            error={error}
            label="code"
            placeholder="Enter a Room Code"
            valuealue={roomCode}
            helperText={error}
            variant="outlined"
            onChange={handleTextFieldChange}
            />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={roomButtonPressed}>
                Enter Room
            </Button>
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="secondary" to="/" component={Link}>
                Back
            </Button>
        </Grid>
    </Grid>



}

export default RoomJoinPage