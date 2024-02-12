import React, { Component, useState, useEffect} from 'react';
import { Grid, Card, Typography, IconButton, LinearProgress}  from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

function MusicPlayer (props) {

    const songProgress = (props.time / props.duration)*100;

    const pauseSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
        };

        fetch("/spotify/pause", requestOptions);
    }

    const playSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
        };

        fetch("/spotify/play", requestOptions);
    }

    return (
        <Card>
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                    <img src={props.image_url} height="100%" width="100%"/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={() => {props.is_playing ? pauseSong : playSong}}>
                            {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon />
                        </IconButton>

                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    );
};

export default MusicPlayer;