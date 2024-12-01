import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();

const client_id = process.env.CLIENT_ID ;
const client_secret = process.env.CLIENT_SECRET

export default async function Post(ode){
    try{
    const params = new URLSearchParams({
        'grant_type': 'authorization_code',
            'code': ode,
            'redirect_uri': 'http://localhost:3001/login'
    })
    const Token = await axios.post('https://accounts.spotify.com/api/token',params,{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
        }
    })
    const obj = {
        access_token : Token.data.access_token,
        expires_in: 3600,
        refresh_token: 'AQBOlutV6EdCOC-_SI9cWThBCR3LIXb0QEwGG5jwhxVVUNBVuLlY1oGLu4RyxqjaNK3-vMWwg1CqlQH4-mWpDaYk4svb2b3Q-zgH5w6LVq7zlm-RIWXCLHAEv5R6vaKGsHo'
    }
    return obj ;
}catch(error){ 
    console.error(error);
}

}

//add a function which you will send request from frontend to fetch the image and essential data used to display to the frontend
