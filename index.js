// import express so you can use it
const express = require('express')
// instantiate your app/server
const app = express()
// define a port
const portNumber = process.argv[2] || 8080

app.get('/todo', (req, res)=>{
    console.log("Doing something")
    res.send("Yo Dawg /todo")
})

app.get('/todo/:cheese/:greeting', function(req, res){
    console.log(req.params)
    res.send(`Yo Dawg /todo/${req.params.cheese}`)
})

// start the server
app.listen(portNumber, ()=>{
    console.log(`Running Server on Port ${portNumber}`)
})