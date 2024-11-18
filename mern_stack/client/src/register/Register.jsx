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

    const inputHandler = (e) => {
        const { name, value } = e.target
        setMembers({ ...member, [name]: value });
    }

    const submitForm = async (e) => {

        e.preventDefault();
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