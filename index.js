const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/index.html')
});

io.on('connection' , (socket)=>{
    console.log('user connected');

    socket.on('chat message' , message=>{
        io.emit('chat message' , message)
    })

    socket.on('disconnect' , ()=>{
        console.log('user disconnect')
    });
})



const port = process.env.PORT || 3000 ;
server.listen(port , ()=>{
    console.clear();
    console.log(`app runing on port ${port}`);
})