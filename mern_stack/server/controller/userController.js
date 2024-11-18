import userModel from "../model/userModel.js";
import User from "../model/userModel.js";


// Insert user 
export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;

        const userExist = await User.findOne({ email });
        if(userExist){
           return res.status(400).json({message: "User already exists."});
        }
        const savedData = await newUser.save();
        res.status(200).json({message:"User created successfully."});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find().sort({_id: -1});
        if(!userData || userData.length === 0){
            return res.status(400).json({message:"User data not found."});
        }        
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

// Get user by id
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(400).json({message:"User data not found."});
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

// Update user 

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(400).json({message:"User data not found."});
        }

        const updateData = {...req.body};

        if(req.body.remark){
            updateData.status = 1;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new:true,
        })
        res.status(200).json({message:"User updated successfully."});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}


// Delete user

export const deleteUser = async (req, res) => {
    try {   
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(400).json({message:'User Not Found.'});
        }
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json({message:'User deleted successfully'});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getTotalUsers = async(req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({totalUsers});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

export const getOpenTickets = async(req, res) => {
    try {
        const openTickets = await User.countDocuments({status : 0});
        res.status(200).json({openTickets});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getClosedTickets = async(req,res) => {
    try {
        const closedTickets = await User.countDocuments({ status:1 });
        res.status(200).json({closedTickets});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}