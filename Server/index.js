import express from 'express';
import Post from './Module.js'
const port = 3001 ;
const app = express();

var token = {} ;
app.listen(port,()=>{
    console.log(`listening on port ${port}`) ;
});

app.get('/login',async(req,res)=>{
    try{
       const code = req.query.code ;
        token = await Post(code) ;
        res.redirect('http://localhost:3000/Dashboard');[]
    }catch{
        res.send("Internal Server Error from post!");
    }
    
});

app.get('/Token',(req,res)=>{
    res.send(token);
})
