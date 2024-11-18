import React, { useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const AddUser = () => {

    const users = {
        name: "",
        email: "",
        mobile: "",
        priority: "",
        query: ""
    };

    const [user, setUser] = useState(users)

    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {

        e.preventDefault();
        await axios.post("http://localhost:8000/api/user", user)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            {/* <Header /> */}
            <div class="container d-flex justify-content-center align-items-center vh-100">
                <div class="col-md-6 bg-white shadow rounded p-4">
                    <h6 class="text-center mb-4">Submit Your Query!!!</h6>
                    <form onSubmit={submitForm}>
                        <div class="mb-3">
                            <label for="exampleInputName" class="form-label">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputName"
                                onChange={inputHandler}
                                name="name"
                                placeholder="Enter name"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail" class="form-label">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail"
                                onChange={inputHandler}
                                name="email"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputMobile" class="form-label">Mobile</label>
                            <input
                                type="number"
                                class="form-control"
                                id="exampleInputMobile"
                                onChange={inputHandler}
                                name="mobile"
                                placeholder="Enter mobile number"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPriority" class="form-label">Select Priority</label>
                            <select
                                class="form-control"
                                id="exampleInputPriority"
                                name="priority"
                                onChange={inputHandler}
                                required
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputQuery" class="form-label">Query</label>
                            <textarea
                                class="form-control"
                                name="query"
                                id="exampleInputQuery"
                                onChange={inputHandler}
                                placeholder="Enter your query here..."
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser;