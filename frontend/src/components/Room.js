import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography}  from "@mui/material";
import CreateRoomPage from './CreateRoomPage';

function Room (props) {
    
    const navigate = useNavigate();

    const initialState = {
        votesToSkip: 2,
        guestCanPause: true,
        isHost: false,
        showSettings: false,
    }
    const [roomData, setRoomData] = useState(props.roomData == undefined ? initialState : props.roomData) 
    const{ roomCode } = useParams();

    const getRoomDetails = () => {
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
                showSettings: false,
            })  
        })
        
    }
    useEffect(() => {
        getRoomDetails();
    },[])

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

    const UpdateShowSettings = {
        
        showSettings (value) {
            setRoomData({showSettings: value})
        }
        
    }

    const closeButtonPressed = () => {
        getRoomDetails();
        setRoomData({showSettings: false});
        console.log('showsettings in closeButtonPressed: '+ roomData.showSettings)
    }

    

    const renderSettings = {
        settings() {
            

            console.log('votes in renderSettings: '+ props.votesToSkip)
            console.log('guest can pause in renderSettings: '+ props.guestCanPause)
            
            return (
                <Grid container spacing={1} align="center">
                    <Grid item xs={12}>
                        <CreateRoomPage
                            update={true} 
                            votesToSkip={roomData.votesToSkip} 
                            guestCanPause={roomData.guestCanPause}
                            roomCode={roomCode}
                            updateCallback={() => {}}
                        />
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={closeButtonPressed}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    };
    
    const renderSettingsButton = {
        settingsButton() {
            console.log('showsettings in renderSettingsButton: '+ roomData.showSettings)
            return (
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => setRoomData({showSettings: true, votesToSkip: roomData.votesToSkip, guestCanPause: roomData.guestCanPause})}>
                        Settings
                    </Button>
                </Grid>
            );
        }
    };
    
    console.log('showsettings: '+ roomData.showSettings)

    console.log('votes: '+ roomData.votesToSkip)
    console.log('guest can pause: '+ roomData.guestCanPause)
    console.log('ishost: '+ roomData.isHost)
    console.log('roomcode: ' + roomCode)
    
    if (roomData.showSettings){
        return renderSettings.settings();
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
                    Guest can pause: {"" + roomData.guestCanPause}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                    Host: {"" + roomData.isHost}
                </Typography>
            </Grid>
            {roomData.isHost ? renderSettingsButton.settingsButton() : null}
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
        
    );
}

export default Room;