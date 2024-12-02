import Member from "../model/memberModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// require("dotenv").config();

export const create_member = async(req,res) => {
    try {

        const {name, email, password} = req.body;

        const memberExist = await Member.findOne({email});
        if(memberExist){
            return res.status(400).json({message: "Member already exist"});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newMember = new Member({
            name, 
            email,
            password: hashedPassword
        });
        
        const savedData = await newMember.save();
        res.status(200).json({message:"Member registered successfully."});
        
    } catch (error) {
        console.log("Error generated", error.message);
    }
}

export const login = async(req,res) => {

const jwtSecret = process.env.JWT_SECRET;


    try {
        const {email, password} = req.body;
        const memberExist = await Member.findOne({email});

        if(!memberExist){
            return res.status(400).json({message:"Email address is invalid."});
        }

        const isPasswordValid = await bcrypt.compare(password, memberExist.password);
        if(!isPasswordValid){
            return res.status(500).json({message:'Invalid credentials.'});
        }

        const token = jwt.sign({id:Member._id},jwtSecret, {
            expiresIn: "1h",
        });

        req.session.user = {
            name: memberExist.name,
            emai: memberExist.email
        };

        res.status(200).json({message:"Login successfully.", session: req.session.user});

    } catch (error) {
        console.log("Error generated",error.message);
    }   
}

export const logout = async(req,res) => {
    console.log('Test logout');
}