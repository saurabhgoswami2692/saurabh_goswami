import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";
import session from "express-session";


const app = express();
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
            app.listen(PORT,()=>{
                console.log(`Server is running on port :${PORT} `)
            });
        }).catch((error)=> console.log(error));

app.use("/api",route); 