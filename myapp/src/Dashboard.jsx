import React, { useState , useEffect} from 'react'
import './Login.css'
import Song from './ListSongs'

export default function Dashboard(){
    const q = new URLSearchParams(window.location.search).get('token');
    const token = decodeURIComponent(q);
    const a = JSON.parse(token);
    const [player,setPlayer] = useState(undefined);
    const [device,setdevice] = useState(undefined);
    const [Stop,setStop] = useState(true);
    const [image,setimage] = useState(false);


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
           let count = 0 ;
           if(player && count <1){
            await player.setName("Noob").then(() => {
                count = count + 1 ;
                console.log('Player name updated!');
              });
           }

        }
        return()=>{
            document.body.removeChild(script)
        }

    }, [a.access_token]);

    useEffect(()=>{
        async function trigger(token){
            if(device&&player!==undefined){   
                await transferPlayback(a.access_token,device);
                await Initialplay(device,a.access_token);
                await Play(a.access_token);
                let c = await GetState(token);
                setimage(c);
                console.log(a.access_token);
            };
        }
        trigger(a.access_token);
    },[a.access_token,device,player]);


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

    async function  Initialplay(device, accessToken) {
            const response = await Play(accessToken);
            let tobaco = {"uris" : ''};
            let track = [] ;
            for(let i = 0  ; i < 50  ; i ++){
                    track[i] = response[i].uri 
            }
            tobaco.uris = track ;
            const url = `https://api.spotify.com/v1/me/player/play?device_id=${device}`;
            const body = {
                uris: track,  
            };
        
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
    return ;
}
        
    async function Play(accessToken){ //purpose is to get users saved tracks and display or transfer it to the playback 
        try{
        const uri = 'https://api.spotify.com/v1/me/tracks?market=ES&limit=50&offset=0';
        const response = await fetch(uri,{
            method : 'GET',
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
        })
        const data = await response.json() ;
        console.log(data);
        let array=[] ;
        for(let i = 0 ;i<data.items.length ; i ++){
            let obj = {} ;
            obj.img = data.items[i].track.album.images[1];
            obj.uri = data.items[i].track.uri;
            array[i] = obj ;
        }
        return array ;
    }catch(error){
        console.error(error);
    }
}

    async function Pause(token){
        const uri = 'https://api.spotify.com/v1/me/player/pause'
        try{
        const response = await fetch(uri,{
            method:'PUT',
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setStop(false);
        return(response);
    }catch(error){
        console.error(error);
    }
    }

    async function Next(token){
        const uri = 'https://api.spotify.com/v1/me/player/next';
        try{
        await fetch(uri,{
            method:'POST',
            headers:{
                Authorization  : `Bearer ${token}`
            }
        })
        await new Promise(resolve=>{setTimeout(resolve,500)})
        let respons = await GetState(token);
        setStop(true);
        setimage(respons);
        return respons ;

        
    }catch(error){
        console.error(error);
    }
}

    async function GetState(token){
        const uri =  `https://api.spotify.com/v1/me/player?market=ES`;
        const response = await fetch(uri,{
            method:'GET',
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        if(response == null){
            console.log(`awaiting data`);
            return ;
        }
        console.log(response);
        const data = await response.json();
        return(data.item.album.images[1].url);
        
    }

    async function Previous(token){
        const uri = 'https://api.spotify.com/v1/me/player/previous';
        try{
        await fetch(uri,{
            method:'POST',
            headers:{
                Authorization  : `Bearer ${token}`
            }
        })
        await new Promise(resolve=>{setTimeout(resolve,500)})
        let respons = await GetState(token);
        setStop(false);
        setimage(respons);
        return respons ;
    }catch(error){
        console.error(error);
    }
}

    async function Resume(token){
        try{
        const uri = `https://api.spotify.com/v1/me/player/play?device_id=${device}`;
        await fetch(uri,{
            method:'PUT',
            headers:{
                Authorization : `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        setStop(true);
        await new Promise(resolve=>{setTimeout(resolve,500)})
        let respons = await GetState(token);
        setimage(respons);
    }catch(error){
        console.log(error);
    }
}

function Shuffle(token){
    const uri = `https://api.spotify.com/v1/me/player/shuffle?state=true`;
    fetch(uri,{
        method:"PUT",
        headers:{
            Authorization : `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}
    
    return (
        <>
        <div className='parent'>
            {image? (<img className='border' src={image} alt='tero baau'/> ):(<h1 style={{ color: '#1ed760' }}>loading image por favor senior ! </h1>)}
            <div className='gap'>
           
                <button onClick={()=>{Previous(a.access_token)}}>Previous</button>
                {Stop ? (
                <button  onClick={() => { Pause(a.access_token);setStop(false) }}>Pause</button>
                ) : (
                <button onClick={() => { Resume(a.access_token);setStop(true) }}>Resume</button>
                )}
                <button onClick={()=>{Next(a.access_token)}}>Next</button>
                <button onClick={()=>{Shuffle(a.access_token)}}>shuffle</button>
            </div>
            <Song/>
        </div>  
        </>
         
)

}