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

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [usersPerPage] = useState(10); // Fixed to 10 users per page


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users?page=${currentPage}&limit=${usersPerPage}`);
                setUsers(response.data.users);
                setFilteredUsers(response.data.users);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.currentPage);
            } catch (error) {
                console.log('Getting error', error);
            }
        };
        // Fetch data every 5 seconds (5000 ms)
        // const intervalId = setInterval(fetchData, 5000);

        // Cleanup the interval on component unmount
        // return () => clearInterval(intervalId);

        fetchData(currentPage)
    }, [currentPage]);

    // delete user
    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            await axios.post(`http://localhost:8000/api/delete/${userId}`)
                .then((response) => {
                    setUsers(users.filter(user => user._id !== userId));
                    toast.success(response.data.message, { position: "top-right" });
                    // Fetch data every 5 seconds (5000 ms)
                    // const intervalId = setInterval(fetchData, 5000);
                    window.location.reload(5000);

                    // Cleanup the interval on component unmount
                    // return () => clearInterval(intervalId);
                })
        }
    }


    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      

    // Search user

    const searchUser = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchVal(value);

        if (value === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(value) ||
                    user.email.toLowerCase().includes(value) ||
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
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th class="text-center">Mobile</th>
                            <th class="text-center">Priority</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} class="text-center" >No Records Found.</td>
                                </tr>
                            ) : (

                                filteredUsers.map((user, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(user.createdAt)}</td>

                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td class="text-center">{user.mobile ? user.mobile : '-'}</td>
                                            <td class={`text-center ${user.priority === '1'
                                                ? 'text-primary'
                                                : user.priority === '2'
                                                    ? 'text-warning'
                                                    : user.priority === '3'
                                                        ? 'text-danger'
                                                        : ''
                                                }`}>
                                                {user.priority === '1' ? 'Low' : user.priority === '2' ? 'Medium' : user.priority === '3' ? 'High' : '-'}
                                            </td>
                                            <td class={`text-center ${user.status == 1 ? 'text-success' : 'text-danger'}`}>
                                                {(user.status == 1) ? 'CLOSED' : 'PENDING'}
                                            </td>
                                            <td class="text-center">
                                                {(user.status == 1) ? 
                                                
                                                    <Link to={`/edit/` + user._id} class="btn btn-success">View</Link>
                                                    // <Link></Link>
                                                        : 
                                                    <div>
                                                        <Link to={`/edit/` + user._id} class="btn btn-warning m-2">Edit</Link>
                                                        <button onClick={() => deleteUser(user._id)} class="btn btn-danger" >Remove</button>
                                                    </div>
                                                }
                                                {/* <Link
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
                                                <button
                                                    class="btn btn-success"
                                                >
                                                    View
                                                </button> */}
                                            </td>
                                        </tr>
                                    );
                                }
                                )

                            )}
                    </tbody>
                    <div className="d-flex justify-content-center mt-3">
                        {
                            filteredUsers.length > 10 && (
                                <>
                                    <button
                                        className="btn btn-primary me-2"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Previous
                                    </button>
                                    <span className="align-self-center">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        className="btn btn-primary ms-2"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Next
                                    </button>
                                </>
                            )
                        }

                    </div>
                </table>
            </div>
        </div>
    )
}

export default User
