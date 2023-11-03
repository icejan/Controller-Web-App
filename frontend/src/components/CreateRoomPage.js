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

export default function CreateRoomPage (props) {
    var defaultVotes = 2;

    const [votes_to_skip,votesToSkip] = useState({votesToSkip: defaultVotes});
    const [guest_can_pause,guestCanPause] = useState({guestCanPause: true});

    const navigate = useNavigate();

    const handleVotesChange = (e) => {
            votesToSkip (e.target.value);
    };

    const handleGuestCanPauseChange = (e) => {
            guestCanPause (e.target.value === "true" ? true : false);
    };

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause,
        })
    };

    const handleRoomButtonPressed = () => {
        console.log(requestOptions)
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.navigate('/room/'+ data.code));
    };

    return (  
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align='center'>Guest Control of Playback state</div>
                    </FormHelperText>
                    <RadioGroup 
                        row 
                        defaultValue="true" 
                        onChange={handleVotesChange}
                        onClick={handleGuestCanPauseChange}
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
                        defaultValue={defaultVotes}
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
    
};

