import React, { useState } from "react";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {

    const [member,setMember] = useState([]);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target
        setMember({ ...member, [name]: value });
    }

    const loginData = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/login",member, {withCredentials: true})
        .then((response)=>{
            toast.success(response.data.message, {position:"top-center"});
            navigate('/dashboard');
        })
        .catch((error) => {
            toast.error(error.response.data.message, {position:"top-center"});
            // console.log(error);
        })
        
    }


    return (
        <div>
            {/* <Header /> */}
            <div class="container d-flex justify-content-center align-items-center vh-100">
                <div class="col-md-4 bg-white shadow rounded p-4">
                    <h6 class="text-center mb-4">Login</h6>
                    <form onSubmit={loginData}  >
                        <div class="mb-3">
                            <label for="exampleInputEmail" class="form-label">Email</label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail"
                                name="email"
                                onChange={inputHandler}
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword" class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword"
                                name="password"
                                onChange={inputHandler}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        <div class="text-center mt-3">
                            <a href="/register" class="text-decoration-none">Click to register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;