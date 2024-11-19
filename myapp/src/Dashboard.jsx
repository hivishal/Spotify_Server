import React, { useState , useEffect } from 'react'
import './Login.css'

export default function Dashboard(){
    const q = new URLSearchParams(window.location.search).get('token');
    const token = decodeURIComponent(q);
    const a = JSON.parse(token);
    const [player, setPlayer] = useState(undefined);
    const [isready,setready] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = async() => {
    
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
    
    
           await player.connect();
           setready(true);

        
        };
    }, [a.access_token]);
    
//since the isready flag is set to true keep the if else statement ready to render the music player
    return (
        <div className='child'>
            <h1 style={{ color: '#1ed760' }}>gello world</h1>
        </div>
)

}