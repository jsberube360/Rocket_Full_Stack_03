// imports
import React, { useState } from "react";
import {useNavigate } from "react-router";
import Alert from "./alert";

// create page

export default function Create() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: 0,
    fee: 0,
    sales: 0,
  });
  const [creationState, setCreationState] = useState("undefined")
  const navigate = useNavigate ();
  // update the state properties of the create form
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  // handle the functions when the for is submitted
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new agent to the database
    const newAgent = { ...form };
    try {
      const response = await fetch("http://localhost:5000/agents", {
        method: "POST",
        headers: {
          "authorization": "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json",
        },
        body: JSON.stringify(newAgent),
      })
      if (response.status !== 200) {
        throw {error: "Bad status code"}
      }
      setCreationState("success")
    }
    catch (error) {
      setCreationState("fail")
      console.log(error)
      return;
    }
    setForm({ first_name: "", last_name: "", email: "", region: "", rating: 0, fee: 0, sales: 0, });
    
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <hr style={{ margin: "0px auto", width: "100%", borderWidth: "3px", color: "#0a65a0", marginBottom: "15px" }} />
      {creationState === "success" && <Alert message="You successfully created a new agent! You will be redirected shortly!" variant="success" duration={3000} onClose={()=>navigate("/admin/list")} />}
      {creationState === "fail" && <Alert message="There was a problem creating the new agent" variant="danger" duration={5000} onClose={()=>setCreationState("undefined")} />}
      <h1 style={{ textAlign: "center", color: "#0a65a0", marginBottom: "20px" }}>Create new agent</h1>
      <form onSubmit={onSubmit} style={{ marginLeft: "5px", marginRight: "5px" }}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <br />

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionNorth"
              value="North"
              checked={form.region === "North"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionNorth" className="form-check-label">North</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionSouth"
              value="South"
              checked={form.region === "South"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionSouth" className="form-check-label">South</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionEast"
              value="East"
              checked={form.region === "East"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionEast" className="form-check-label">East</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionWest"
              value="West"
              checked={form.region === "West"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionWest" className="form-check-label">West</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={form.rating}
            onChange={(e) => updateForm({ rating: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fee">Fee</label>
          <input
            type="text"
            className="form-control"
            id="fee"
            value={form.fee}
            onChange={(e) => updateForm({ fee: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sales">Sales</label>
          <input
            type="text"
            className="form-control"
            id="sales"
            value={form.sales}
            onChange={(e) => updateForm({ sales: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Create agent"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
