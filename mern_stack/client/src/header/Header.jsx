import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
    const [userEmail, setUserEmail] = useState(null); // State to store user email

    // Function to fetch session data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/session", {
                withCredentials: true, // Include cookies for session tracking
            });
            console.log(response.data.user.name);
            setUserEmail(response.data.user.name); // Extract and set email
        } catch (error) {
            console.log(error);
        }
    };

    // Run once on component mount
    useEffect(() => {
        fetchData();
    }, []); // Dependency array ensures this runs only once

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-2 p-3">
                <a className="navbar-brand" href="#">TMS</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/dashboard" className="nav-link active">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">Tickets</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto"> {/* Aligns to the right */}
                        {userEmail ? (
                            <li className="nav-item">
                                <span className="nav-link text-light">Welcome, {userEmail}</span>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
