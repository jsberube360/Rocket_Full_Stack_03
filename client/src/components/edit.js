// imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Alert from "./alert";
import Modal from './modal';

//edit page
export default function Edit() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: 0,
    fee: 0,
    sales: 0,
  });
  const [updateState, setUpdateState] = useState ("undefined")
  const [showModal, setShowModal] = useState(false);  
  const params = useParams();
  const navigate = useNavigate();
  // handles the function executed when the form is being submitted
  const onFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  // closes the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //fetch data to get the infos of the agent we want to edit
    async function fetchData() {
      const id = params.id.toString();
      try {
        const response = await fetch(`http://localhost:5000/agents/${params.id.toString()}`)
        const agent = await response.json();
        if (!agent) {
          window.alert(`Agent with id ${id} not found`);
          navigate("/admin/list");
          return;
        }
        setForm(agent);
      }
      catch (error) {
        window.alert(error);
        navigate("/admin/list");
        return;
      }
    }
    fetchData();
    return;
  }, [params.id, navigate]);
  // update the state properties of the form
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onEditConfirmed() {
    const editedAgent = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      region: form.region.toLowerCase(),
      rating: Number(form.rating),
      fee: Number(form.fee),
      sales: Number(form.sales),
    };
    // send a post request to update the data in the database
    try {
      const response = await fetch(`http://localhost:5000/agents/${params.id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify(editedAgent),
      })
      if (response.status !== 200) {
        throw {error: "Bad status code"}
      }
      setUpdateState("success")
    }
    catch (error) {
      setUpdateState("fail")
      console.log(error)
      handleCloseModal()
      return;
    }
    handleCloseModal()
  }
  // Display the form that takes input from the user to update the agent's data
  return (
    <div>
      <hr style={{ margin: "0px auto", width: "100%", borderWidth: "3px", color: "#0a65a0", marginBottom: "15px" }} />
      {updateState === "success" && <Alert message="You successfully updated this agent! You will be redirected shortly!" variant="success" duration={3000} onClose={()=>navigate("/admin/list")} />}
      {updateState === "fail" && <Alert message="There was a problem updating this agent" variant="danger" duration={3000} onClose={()=>setUpdateState("undefined")} />}
      <Modal 
        showModal={showModal} 
        handleClose={handleCloseModal} 
        message="Are you sure you want to update this agent?" 
        title="Update agent" 
        action="Confirm update" 
        handleAction= {onEditConfirmed} 
      />
      <h1 style={{ textAlign: "center", color: "#0a65a0", marginBottom: "20px" }}>Update agent</h1>
      <form onSubmit={ onFormSubmit } style={{ marginLeft: "5px", marginRight: "5px" }}>
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
            value="Update Agent"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
