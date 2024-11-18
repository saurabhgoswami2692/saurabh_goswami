import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
const EditUser = () => {
    const users = {
        name:"",
        email:"",
        address:"",
    };

    const [user,setUser] = useState(users)
    const {id} = useParams();
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const {name,value} = e.target
        setUser({...user,[name]: value});
    };

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response)=>{
            setUser(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[id]);

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`,user)
        .then((response)=>{
            toast.success(response.data.message,{position:"top-right"});
            navigate("/users");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div>

            <Header />
            <div class="container my-5">
        <h6 class="d-flex justify-content-center">Update</h6>
        <div class="d-flex justify-content-center align-items-center center-container">
            <div class="col-md-4 border rounded">
                <form class="m-3" onSubmit={submitForm}>
                    <div class="form-group p-2">
                        <label for="exampleInputName">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputName"
                            value={user.name}
                            name="name"
                            placeholder="Enter name"
                            disabled
                        />
                    </div>
                    <div class="form-group p-2">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            value={user.email}
                            name="email"
                            placeholder="Enter email"
                            disabled
                        />
                    </div>
                    <div class="form-group p-2">
                        <label for="exampleInputMobile1">Mobile</label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputMobile1"
                            value={user.mobile}
                            name="mobile"
                            placeholder="Enter mobile number"
                            disabled
                        />
                    </div>
                    <div class="form-group p-2">
                        <label for="exampleInputPriority1">Select Priority</label>
                        <select
                            class="form-control"
                            id="exampleInputPriority1"
                            name="priority"
                            value={user.priority}
                            disabled
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div class="form-group p-2">
                        <label for="exampleInputQuery1">Query</label>
                        <textarea
                            class="form-control"
                            name="query"
                            id="exampleInputQuery1"
                            value={user.query}
                            placeholder="Enter your query here..."
                            disabled
                        ></textarea>
                    </div>
                    <div class="form-group p-2">
                        <label for="exampleInputReply1">Remarks</label>
                        <textarea
                            class="form-control"
                            name="remark"
                            id="exampleInputReply1"
                            value={user.remark}
                            onChange={inputHandler}
                            placeholder="Enter your remark here..."
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary m-3">Update</button>
                </form>
            </div>
        </div>
    </div>        </div>
    )
}

export default EditUser;