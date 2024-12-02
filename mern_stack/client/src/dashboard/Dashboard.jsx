import React, { useEffect, useState } from "react"
import Header from "../header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalClosedTickets, settotalClosedTickets] = useState(0);
    const [totalOpenTickets, settotalOpenTickets] = useState(0);

    const fetchTotalUsers = async() => {
        try {
            const response = await axios.get('http://localhost:8000/api/total-users');
            // console.log(response);
            setTotalUsers(response.data.totalUsers);
        } catch (error) {
            console.log('Fetching error', error);
        }
    };

    const fetchClosedTickets = async() => {
        try {
            const response = await axios.get("http://localhost:8000/api/closed-tickets");
            
            settotalClosedTickets(response.data.closedTickets);
        } catch (error) {
            console.log("error",error);
        }
    }

    const fetchOpenTickets = async() => {
        try {
            const response = await axios.get("http://localhost:8000/api/open-tickets");
            settotalOpenTickets(response.data.openTickets);
        } catch (error) {
            console.log("Error",error);
        }
    }

    useEffect(() => {
        const session = localStorage.getItem('session');
        if(session){
            navigate('/admin');
        }
        fetchTotalUsers();
        fetchClosedTickets();
        fetchOpenTickets();
    },[navigate]);

    return (
        <div>
            <Header />
            <div class="container my-5">
                <div class="row">
                    <div class="col-sm-4 mb-4">
                        <div class="card text-white bg-light">
                            <div class="card-body text-center border border-success">
                                <h5 class="card-title text-success">Total Tickets</h5>
                                <p class="card-text text-secondary" style={{ fontSize: "1.5rem" }}>{totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 mb-4">
                        <div class="card text-white bg-light">
                            <div class="card-body text-center border border-success">
                                <h5 class="card-title text-success">Open Tickets</h5>
                                <p class="card-text text-secondary" style={{ fontSize: "1.5rem" }}>{totalOpenTickets}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 mb-4">
                        <div class="card text-white bg-light">
                            <div class="card-body text-center border border-success">
                                <h5 class="card-title text-success">Closed Tickets</h5>
                                <p class="card-text text-secondary" style={{ fontSize: "1.5rem" }}>{ totalClosedTickets }</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* priority wise */}
                {/* <div class="row">
                    <div class="col-sm-4 mb-4">
                        <div class="card text-white bg-light">
                            <div class="card-body text-center border border-danger">
                                <h5 class="card-title text-danger">High Priority</h5>
                                <p class="card-text text-secondary" style={{ fontSize: "1.5rem" }}>{totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 mb-4">
                        <div class="card text-white bg-light">
                            <div class="card-body text-center border border-warning">
                                <h5 class="card-title text-warning">Medium Priority</h5>
                                <p class="card-text text-secondary" style={{ fontSize: "1.5rem" }}>0</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 mb-4">
                        <div class="card text-white bg-light">
                            <div class="card-body text-center border border-primary">
                                <h5 class="card-title text-primary">Low Priority</h5>
                                <p class="card-text text-secondary" style={{ fontSize: "1.5rem" }}>0</p>
                            </div>
                        </div>
                    </div> */}
                {/* </div> */}
            </div>       </div>
    )
}

export default Dashboard;