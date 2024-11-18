import express from "express";

import { create, deleteUser, getAllUsers, getClosedTickets, getOpenTickets, getTotalUsers, getUserById, update } from "../controller/userController.js";
import { create_member, login } from "../controller/memberController.js";


const route = express.Router();

route.post('/user',create);
route.get('/users',getAllUsers);
route.get("/user/:id",getUserById);
route.put('/update/:id',update);
route.post('/delete/:id',deleteUser);
route.get('/total-users/',getTotalUsers);
route.get('/closed-tickets',getClosedTickets);
route.get('/open-tickets',getOpenTickets);

route.post('/member',create_member);
route.post('/login',login);

route.get('/session',(req,res) => {
    if(req.session.user){
        res.status(200).json({user: req.session.user});
    } else {
        res.status(500).json({message:"Not logged in."});
    }
}); 

export default route;