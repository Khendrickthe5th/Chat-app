const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const { getAllData } = require("./database")
const http = require('http').Server(app)

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next)=>{
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE,");
    res.append("Access-Control-Allow-Headers", "Content-Type")
    next()
})

// Sockets.io block of functions 
const socketIo = require('socket.io')(http, {cors: {origin: 'http://localhost:3000'}})
const connectedUsers = {}

socketIo.on('connection', (socket) => {
    socket.on("join", (user)=>{
        connectedUsers[socket.id] = user;
        socketIo.emit("userList", connectedUsers)
    })

    socket.on('message', (data)=>{
        socketIo.emit('message', data)
    })
    socket.on('disconnect', () => {
        // connectedUsers.socket.id = user;
        // socket.emit("userList", connectedUsers)
      });
})


app.get("/getAllData", async(req, res)=>{
const response = await getAllData()
res.status(200).send(response)
console.log("Good!", response)
})

http.listen(3100, (err, res)=>{
    if (err){
        console.log(err, "Failed" )
    }
    console.log(res, "Success!!")

})
