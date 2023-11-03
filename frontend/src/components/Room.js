import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

function withParams(Component){
    return props => <Component {...props} params={useParams()}/>;
}

export default class Room (props) {
    const initialState = {
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    }
}
    

    const [roomData, setRoomData] = useState(initialState) 
    const {roomCode} = useParams()

    getRoomDetails(() => {
        fetch("/api/create-room" + "?code="+ roomCode)
        .then(res => res.json())
        .then(data =>{
            setRoomData({
                roomData,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })  
        })
    },[roomCode,setRoomData])
    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {roomData.votesToSkip}</p>
            <p>Guest can pause: {roomData.guestCanPause.toString()}</p>
            <p>Host: {roomData.isHost.toString()}</p>
        </div>
    );
