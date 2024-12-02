import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = ({setIsAuthenticated}) => {

    const members = {
        email: "",
        password: ""
    };

    const [member,setMember] = useState(members);
    const [errors,setErrors] = useState({
        email:false,
        password: false,
    });
    const navigate = useNavigate();

    

    const inputHandler = (e) => {
        const { name, value } = e.target
        setMember({ ...member, [name]: value });

        if(value.trim() !== ''){
            setErrors({...errors,[name]:false});
        }
    }

    const loginData = async(e) => {
        e.preventDefault();

        console.log(member);


        const newErrors = {
            email: member.email.trim() === "",
            password: member.password.trim() === ""
        };

        setErrors(newErrors);

        if(Object.values(newErrors).some(error => error)){
            return;
        }


        await axios.post("http://localhost:8000/api/login",member, {withCredentials: true})
        .then((response)=>{
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated','true');
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
                                
                            />
                            {errors.email && (
                                <span class="text-danger">* Please enter your email.</span>
                            )}

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
                                
                            />
                            {errors.password && (
                                <span class="text-danger">* Please enter password.</span>
                            )}

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