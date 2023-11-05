import React, { Component, useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Navigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography}  from "@mui/material";

import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link, 
    Redirect,
    useNavigate, 
} from "react-router-dom";
import { render } from "react-dom";

function HomePage (props) {
    //const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        async function autoEnter() {
            fetch('api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            })
        };
        autoEnter();
    },[])

    return ( 
        <Router>
            <Routes>
                <Route path="/" 
                element={
                    roomCode ?
                    <Navigate replace to={`/room/${roomCode}`} />
                    : <Grid container spacing={3}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h3" compact="h3">
                            House Party
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button color="primary" to='/join' component={ Link }>
                                Join a Room
                            </Button>
                            <Button color="secondary" to='/create' component={ Link }>
                                Create a Room
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                }/>
                <Route path="/join" element={<RoomJoinPage/>} />
                <Route path="/create" element={<CreateRoomPage/>} />
                <Route path="/room/:roomCode" element={<Room/>} />
            </Routes>
        </Router>
    );
}

export default HomePage;