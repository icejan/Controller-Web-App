import React, { Component, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function CreateRoomPage (props) {
    //{votesToSkip=2, guestCanPause=true, update=false, roomCode=null,updateCallback = () => {} }
    const defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    }

    //const [defaultVotes, setDefaultVotes] = useState(2);
    const navigate = useNavigate();

    
    const [votesToSkip,setVotesToSkip] = useState(defaultProps.votesToSkip);
    const [guestCanPause,setGuestCanPause] = useState(defaultProps.guestCanPause);

    const [update, setUpdate] = useState(defaultProps.update);
    const [roomCode, setRoomCode] = useState(defaultProps.roomCode);

    const handleVotesChange = () => {
            setVotesToSkip (event.target.value);
    };

    const handleGuestCanPauseChange = () => {
            setGuestCanPause (event.target.value === "true" ? true : false);
    };

    const handleRoomButtonPressed = () => {
        console.log('Test');
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            })
        };
        console.log('Test2');
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => {setRoomCode(data.code), navigate('/room/'+ data.code)});
    };

    const renderCreateButton = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
            </Grid>
        );
    }

    const renderUpdateButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
                    Update Room
                </Button>
            </Grid>
        );
    }
    const title = props.update ? "Update Room" : "Create a Room";
    
    return (  
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align='center'>Guest Control of Playback state</div>
                    </FormHelperText>
                    <RadioGroup 
                        row 
                        defaultValue={defaultProps.guestCanPause} 
                        onChange={handleGuestCanPauseChange}
                    >
                        <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                        required={true} 
                        type="number" 
                        onChange={handleVotesChange}
                        defaultValue={defaultProps.votesToSkip}
                        inputProps={{
                            min: 1,
                            style: {textAlign: "center"},
                        }}
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes Required to Skip Songs
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {props.update ? renderUpdateButton() : renderCreateButton()}
        </Grid>
    ); 
    
};

export default CreateRoomPage;
