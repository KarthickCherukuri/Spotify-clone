# Spotify-Clone

## Description

This project is a clone of the popular music streaming service, Spotify. It is built using React Native and communicates with Spotify's backend for user authentication and music streaming.

## Features

- User Authentication: Users can log in using their Spotify account. This is implemented using Spotify's Web API Authorization Code Flow.
- Music Streaming: Users can browse and search for their favorite songs, artists, and albums, and play music tracks.
- Album Art and Song Details: Users can view album art and song details.

## Installation

To install and run this project, you will need Node.js, npm, and Expo CLI installed on your machine. Follow these steps:

1. Clone this repository: `git clone https://github.com/KarthickCherukuri/Spotify-clone.git`
2. Navigate into the project directory: `cd spotify-clone`
3. Install the dependencies: `npm install`
4. Start the project: `npm start`

## Usage

Once you've started the project, you can use it just like you would use the Spotify app. Browse for songs, play them, and enjoy your music!

## Contributing

Contributions are welcome! Please read the contributing guidelines before making any changes.

## Code Overview

The `App.js` file is the entry point of the application. It sets up the Spotify Web API Authorization Code Flow. When the app is launched, it checks if the user is already authenticated. If not, it prompts the user to sign in with their Spotify account.

The `SplashScreen.js` file is displayed while the app is checking the user's authentication status.

The `useAuthRequest` hook from `expo-auth-session` is used to make a request to Spotify's Web API Authorization Code Flow. The `iosClientId` and `androidClientId` are the client IDs for the Spotify Web API OAuth 2.0 client.

<!-- The `onAuthStateChanged` function is used to set up a listener that's called whenever the user's authentication status changes. It's used to get the user's information when they sign in. -->
