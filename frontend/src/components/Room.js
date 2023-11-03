import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

function Room (props) {
    
    const initialState = {
        votesToSkip: 2,
        guestCanPause: true,
        isHost: false,
    }
    const [roomData, setRoomData] = useState(initialState) 
    const{ roomCode } = useParams();

    useEffect(() => {
        fetch("/api/get-room" + "?code="+ roomCode)
        .then(res => res.json())
        .then(data =>{
            setRoomData({
                ...roomData,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })  
        })
    })

    return (
        <div>
            <h3>Room Code: {roomCode}</h3>
            <p>Votes: {roomData.votesToSkip}</p>
            <p>Guest can pause: {roomData.guestCanPause.toString()}</p>
            <p>Host: {roomData.isHost.toString()}</p>
        </div>
    );
}


export default Room;