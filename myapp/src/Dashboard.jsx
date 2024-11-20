import React, { useState , useEffect } from 'react'
import './Login.css'

export default function Dashboard(){
    const q = new URLSearchParams(window.location.search).get('token');
    const token = decodeURIComponent(q);
    const a = JSON.parse(token);
    const [player, setPlayer] = useState(undefined);
    const [device , setdevice] = useState(undefined);
   

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
                setdevice(device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
    
    
           await player.connect();

        
        };
    }, [a.access_token]);
    
//since the isready flag is set to true keep the if else statement ready to render the music player

        const transferPlayback = async (accessToken, device) => {
            const url = 'https://api.spotify.com/v1/me/player';
            const body = {
                device_ids: [device],
                play: true,
            };
        
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        
            if (response.ok) {
                console.log('Playback transferred successfully');
            } else {
                const error = await response.json();
                console.error('Error transferring playback:', error);
            }
        };

if(player){
    transferPlayback(a.access_token,device);
}
    
    return (
        <div className='child'>
            <h1 style={{ color: '#1ed760' }}>gello world</h1>
        </div>
)

}