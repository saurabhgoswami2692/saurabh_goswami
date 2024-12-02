import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
const EditUser = () => {
    const users = {
        name: "",
        email: "",
        address: "",
    };

    const [user, setUser] = useState(users)
    const { id } = useParams();
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                navigate("/users");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2,'0');
      const month = String(date.getMonth() + 1).padStart(2,'0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } 

    return (
<div>
  <Header />
  <div className="container my-5">
    <h6 className="d-flex justify-content-center">Update Ticket</h6>

    <div className="d-flex justify-content-center align-items-center">
      <div className="col-md-8 col-lg-6 border rounded p-4 shadow-sm bg-white">
        <form onSubmit={submitForm}>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row" className="w-50 fw-bold">Name:</th>
                <td className="text-secondary">{user.name}</td>
              </tr>

              <tr>
                <th scope="row" className="fw-bold">Email:</th>
                <td className="text-secondary">{user.email}</td>
              </tr>

              <tr>
                <th scope="row" className="fw-bold">Mobile:</th>
                <td className="text-secondary">{user.mobile}</td>
              </tr>

              <tr>
                <th scope="row" className="fw-bold">Priority:</th>
                <td className="text-secondary">
                  {user.priority === 1 ? "Low" : user.priority === 2 ? "Medium" : "High"}
                </td>
              </tr>

              <tr>
                <th scope="row" className="fw-bold">Query:</th>
                <td className="text-secondary">{user.query}</td>
              </tr>

              <tr>
                <th scope="row" className="fw-bold">Remarks:</th>
                <td>
                  {user.status == 1 ? (
                    <span className="text-secondary">{user.remark}</span>
                  ) : (
                    <textarea
                      className="form-control"
                      name="remark"
                      id="exampleInputReply1"
                      onChange={inputHandler}
                      placeholder="Enter your remark here..."
                    ></textarea>
                  )}
                </td>
              </tr>

              { user.status === 1 && (
                <tr>
                  <th scope="row" className="fw-bold">Closed Date:</th>
                  <td>
                    {formatDate(user.updatedAt)}
                  </td>
                </tr>
                )}

              <tr>
                <th scope="row" className="fw-bold">Status:</th>
                <td className={`${user.status === 1 ? "text-success" : "text-danger"}`}>
                  {user.status === 1 ? "Closed" : "Pending"}
                </td>
              </tr>
            </tbody>
          </table>

          {user.status === 0 && (
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-3">
                Update
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
</div>

      
    )
}

export default EditUser;