//INITIALIZE
import express from 'express'
import dotenv from 'dotenv'
import auth_router from './Routes/authblog.js'
import blog_router from "./Routes/blog.js"
import { connect } from "./connections/connect.js"
import { cookie_parser, json, static_css, static_html, static_image, static_js, urladd, urlencoded } from "./Middlewares/middle.js"
import mongoose from 'mongoose'
dotenv.config()
const port = process.env.PORT ||8000





//socket.io

// server.js

import { createServer } from 'http';
import { Server } from 'socket.io';
import { title } from "process"
import { LoggedInUserOnly, restrictToLoggedInUserOnly } from './Middlewares/auth.js'


const app = express();
const server = createServer(app);
const io = new Server(server);



io.on('connection', (socket) => {
   
    

    // Listen for changes from the main window
    socket.on('contentChange', (data) => {
        // Broadcast changes to all clients, including the popup

        socket.broadcast.emit('contentUpdate', data);
    });

    socket.on('imageUpdate', (data) => {
        // Broadcast changes to all clients, including the popup
       
        socket.broadcast.emit('mainImage', data);
    });

    socket.on('title', (data) => {
        // Broadcast changes to all clients, including the popup

        socket.broadcast.emit('title', data);
    });
    socket.on('blog_html', (data) => {
        // Broadcast changes    to all clients, including the popup
   
        
    });


});






//EJS setup
app.set('view engine', "ejs")
app.set('views', './views')

//Mongo connect

connect(process.env.mongourl).then(() => {
    console.log('MongoDB connected Successfully')
})
    .catch((er) => {
        console.log(er)
    })



    
    
//MIDDLEWARES
app.use(urlencoded())
app.use(urladd)
app.use(static_css())
app.use(static_image())
app.use(json())
app.use(static_js())
app.use(static_html())
app.use(cookie_parser())
app.use(LoggedInUserOnly)


//ROUTERS
app.use(auth_router)
app.use(blog_router)

//LISTENER
server.listen(8000, () => {
    console.log('http://localhost:8000');
});


