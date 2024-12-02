import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";
import session from "express-session";
import nodemailer from "nodemailer";
import http from "http";
import { Server } from "socket.io";
import { Socket } from "dgram";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"],
        credentials:true,
    },    
});


app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies to be sent
}));

app.use(session({
    secret:'password123',
    resave:false,
    saveUninitialized:true,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true // Ensures the cookie is sent only over HTTP(S), not client-side JavaScript
    }
}));

dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL || 5000;

mongoose.connect(MONGOURL).then (()=>{
            console.log('DB connected successfully');
            server.listen(PORT,()=>{
                console.log(`Server is running on port :${PORT} `)
            });
        }).catch((error)=> console.log(error));


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
    });
});



app.use("/api",route); 