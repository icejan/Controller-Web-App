# Controller-Web-App
<a name="readme-top"></a>

## Table of Contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Credits](#credits)

## Introduction
This web application lets users collabortate in a room to share controls on the music currently playing. The host (creator of the room) can connect to Spotify and allow other users in the room to control the music playing depending on the permmissions set.

## Technologies
The application is created with:
* Javascript
* React
* Python3
* Django

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Prerequisites
* An existing spotify account (must have premium to be able to control the music)
* Have python3 installed

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation
Clone the repo:

`git clone https://github.com/icejan/Controllr-Wep-App.git`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage
* To run the web server on your computer, use the command

`python3 .\manage.py runserver`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

https://github.com/icejan/Controller-Web-App/assets/97641242/188357d5-ff5f-4f9a-a702-7d5446ffdc8e

* Users can create a personal room that has a unique roomcode for other users to join
* The host (creator of the room) can log into spotify and authorize the application to access their account
* Hosts and other users (if permitted by host) in the room can pause, play and skip the song currently playing
* If the host accidentally closes their web browser and revisits the homepage, they will be automatically redirected back to their room
* IF the host leaves the room they created, the room is automatically deleted

https://github.com/icejan/Controller-Web-App/assets/97641242/84a3571d-da59-44e9-bbac-b94525e66b6d

* The host can update their own room settings anytime, where changes will be applied right away and saved in the server

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Credits
* Tutorial from Tech With Tim - techwithtim.net
* Material-UI - https://mui.com/material-ui/
* Spotify - spotify.com
