import express from 'express';
import {Post,UserSaved} from './Module.js'
import axios from 'axios';
import bodyParser from 'body-parser';


const port = 3001 ;
const app = express();
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/login',async(req,res)=>{
    try{
        const code = req.query.code ;
        const obj = await Post(code) ;
        obj.code = code ;
        const token = encodeURIComponent(JSON.stringify(obj));
        res.redirect(`http://localhost:3000/Dashboard?token=${token}`);
    }catch(error){
        res.send("Internal Server Error from post!");
        console.log(error);
    }
});


app.post('/refresh',async(req,res)=>{
    const { refresh_token } = req.body;  

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);

    try {
        const refresh = await axios.post("https://accounts.spotify.com/api/token", params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            }
        });
        console.log(refresh);
        res.json(refresh.data);}
        
        catch(error){
            console.error(error);
        }
});

app.get('/Saved', async (req, res) => {
    const Token = req.query.token;
    try {
        const response = await UserSaved(Token); 
        const jsonData = await response.json(); 
        console.log(jsonData);
        res.json(jsonData); 
    } catch (error) {
        console.error("Error fetching saved tracks:", error.message);
    }
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`) ;
});