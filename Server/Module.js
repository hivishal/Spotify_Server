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
    return Token ;
}catch(error){ 
    console.error(error);
}

}
