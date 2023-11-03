import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

function withParams(Component){
    return props => <Component {...props} params={useParams()}/>;
}

function Room (props) {
    const[roomCode, setRoomCode] = useState(props.match.params.roomCode)
    const initialState = {
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    }
    const [roomData, setRoomData] = useState(initialState) 

    useEffect(() => {
        fetch("/api/create-room" + "?code="+ roomCode)
        .then(res => res.json())
        .then(data =>{
            setRoomData({
                ...roomData,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })  
        })
    },[roomCode, setRoomCode])
}

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {roomData.votesToSkip}</p>
            <p>Guest can pause: {roomData.guestCanPause.toString()}</p>
            <p>Host: {roomData.isHost.toString()}</p>
        </div>
    );

export default Room;