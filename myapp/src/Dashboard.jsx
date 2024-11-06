import React, { useState , useEffect } from 'react'

export default function Dashboard(){
    const q = new URLSearchParams(window.location.search).get('token');
    const token = decodeURIComponent(q);
    const a = JSON.parse(token);
    const [player, setPlayer] = useState(undefined);
    
useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);
    


    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(a.access_token); },
            volume: 0.5
        });
        setPlayer(player);


        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });


        player.connect();

    };
}, [a.access_token]);

    return (
        <div>
            {a.access_token}
        </div>
    );
}