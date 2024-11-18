import React, { useEffect, useState } from "react"
import "./user.css";
import axios from "axios"
import { Link } from "react-router-dom";
import Header from "../header/Header";
import toast from "react-hot-toast";
const User = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.log('Getting error', error);
            }
        };
        // Fetch data every 5 seconds (5000 ms)
        // const intervalId = setInterval(fetchData, 5000);

        // Cleanup the interval on component unmount
        // return () => clearInterval(intervalId);

        fetchData()
    }, []);

    // delete user
    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            await axios.post(`http://localhost:8000/api/delete/${userId}`)
                .then((response) => {
                    setUsers(users.filter(user => user._id !== userId));
                    toast.success(response.data.message, { position: "top-right" });
                })
        }
    }

    // Search user

    const searchUser = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchVal(value);
        
        if(value === ""){
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(
            (user) => 
                user.name.toLowerCase().includes(value) || 
                user.email.toLowerCase().includes(value) ||
                user.priority.toLowerCase().includes(value) ||
                (user.mobile && user.mobile.toString().includes(value))
             );
             console.log(filtered);
             setFilteredUsers(filtered);
        }

    }

    return (
        <div>
            <Header />
            <div class="container my-5">
                <div class="row mb-4">
                    <div class="col-md-6">
                           <input
                            type="text"
                            class="form-control m-3"
                            onChange={searchUser}
                            value={searchVal}
                            placeholder="Search by name, email, mobile and priority"
                        />
                    </div>
                    <div class="col-md-6">
                        {/* <span class="m-3 ms-auto d-block" style={{ width: "fit-content" }}>Total Tickets: 12</span> */}
                        {/* <Link
                            to="/add"
                            class="btn btn-primary m-3 ms-auto d-block"
                            style={{ width: "fit-content" }}
                        >
                            Add User
                        </Link> */}
                    </div>
                </div>

                <table class="table table-bordered table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th class="text-center">Mobile</th>
                            <th class="text-center">Priority</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => { 
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td class="text-center">{user.mobile ? user.mobile : '-'}</td>
                                    <td class={`text-center ${user.priority === 'low'
                                            ? 'text-primary'
                                            : user.priority === 'medium'
                                                ? 'text-warning'
                                                : user.priority === 'high'
                                                    ? 'text-danger'
                                                    : ''
                                        }`}>
                                        {user.priority ? user.priority.toUpperCase() : '-'}
                                    </td>
                                    <td class={`text-center ${user.status == 1 ? 'text-success' : 'text-danger'}`}>
                                        {(user.status == 1) ? 'CLOSED' : 'PENDING'}
                                    </td>
                                    <td class="text-center">
                                        <Link
                                            to={`/edit/` + user._id}
                                            class="btn btn-warning m-2"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            class="btn btn-danger"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User
