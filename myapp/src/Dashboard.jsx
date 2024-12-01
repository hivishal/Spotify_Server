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

        return()=>{
            document.body.removeChild(script)
        }
        };
    }, [a.access_token]);
    

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


    if(device!==undefined){
        transferPlayback(a.access_token,device);
        Initialplay(device, a.access_token);
    }

    async function  Initialplay(device, accessToken) {
        const url = `https://api.spotify.com/v1/me/player/play?device_id=${device}`;
        const trackUri = 'spotify:track:0G21yYKMZoHa30cYVi1iA8?si=ebd661cc1c9c4c21';
        const body = {
            uris: [trackUri],  
            position_ms: 0     
        };
    
        const c  = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return c ;
    }

    async function Pause(token){
        const uri = 'https://api.spotify.com/v1/me/player/pause'
        try{
        const response = await fetch(uri,{
            method:'PUT',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return(response)
    }catch(error){
        console.error(error);
    }
    }
    
    return (
        <div className='child'>
            <h1 style={{ color: '#1ed760' }}>gello world</h1>
            <h1 style={{ color: '#1ed760' }}>player</h1>
            <button onClick={()=>{Pause(a.access_token)}}>Pause</button>
        </div>
        
)

}