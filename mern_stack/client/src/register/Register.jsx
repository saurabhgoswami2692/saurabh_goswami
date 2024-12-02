import React, { useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {

    const members = {
        name: '',
        email: '',
        password: ''
    };

    const [member, setMembers] = useState(members);
    const [errors,setErrors] = useState({
        name:false,
        email:false,
        password:false
    });

    const inputHandler = (e) => {
        const { name, value } = e.target
        setMembers({ ...member, [name]: value });

        if(value.trim() !== ""){
            setErrors({...errors, [name]:false});
        }
    }

    const submitForm = async (e) => {
        
        e.preventDefault();
        
        const newErrors = {
            name: member.name.trim() === "",
            email: member.email.trim() === "",
            password: member.password.trim() === ""
        };

        setErrors(newErrors);

        if(Object.values(newErrors).some(error => error)){
            return;
        }

        await axios.post("http://localhost:8000/api/member", member)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                setMembers({
                    name: "",
                    email: "",
                    password: "",
                });
            })
            .catch((response) => {
                toast.error(response.response.data.message, { position: "top-center" });
                console.log(response.response.data.message);
            });
    }

    return (
        <div>
            {/* <Header /> */}
            <div class="container d-flex justify-content-center align-items-center vh-100">
                <div class="col-md-4 bg-white shadow rounded p-4">
                    <h6 class="text-center mb-4">Register</h6>
                    <form onSubmit={submitForm}>
                        <div class="mb-3">
                            <label for="exampleInputName" class="form-label">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputName"
                                value={member.name}
                                onChange={inputHandler}
                                name="name"
                                placeholder="Enter name"
                                required
                            />
                            {errors.name && (
                                <span class="text-danger">*Please enter your name.</span>
                            )}
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail" class="form-label">Email</label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail"
                                value={member.email}
                                onChange={inputHandler}
                                name="email"
                                placeholder="Enter email"
                                required
                            />
                            {errors.email && (
                                <span class="text-danger">*Please enter your email.</span>
                            )}

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword" class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword"
                                value={member.password}
                                onChange={inputHandler}
                                name="password"
                                placeholder="Enter password"
                                required
                            />
                            {errors.password && (
                                <span class="text-danger">*Please enter your password.</span>
                            )}

                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;