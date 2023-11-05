import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography}  from "@mui/material";

function Room (props) {
    
    const navigate = useNavigate();

    const initialState = {
        votesToSkip: 2,
        guestCanPause: true,
        isHost: false,
    }
    const [roomData, setRoomData] = useState(initialState) 
    const{ roomCode } = useParams();

    useEffect(() => {
        fetch("/api/get-room" + "?code="+ roomCode)
        .then((response) => {
            if (!response.ok) {
                navigate('/');
            }
            return response.json()
        })
        .then(data =>{
            setRoomData({
                ...roomData,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })  
        })
    })

    const leaveButtonPressed = () => {
        //console.log('Test');
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        };
        //console.log('Test2');
        fetch("/api/leave-room", requestOptions)
            .then((_response) => {
                navigate('/');
            });
    }
    
    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                    Votes: {roomData.votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                    Guest can pause: {roomData.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                    Host: {roomData.isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
        
    );
}

export default Room;