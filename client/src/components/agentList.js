import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./alert";
import Modal from './modal';
const Agent = (props) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <tr>
      <Modal 
        showModal={showModal} 
        handleClose={handleCloseModal} 
        message="Are you sure you want to delete this agent?" 
        title="Delete agent" 
        action="Confirm deletion" 
        handleAction= { props.deleteAgent } 
      />
      <td>{props.agent.first_name}</td>
      <td>{props.agent.last_name}</td>
      <td>{props.agent.email}</td>
      <td>{props.agent.region}</td>
      <td>{props.agent.rating}</td>
      <td>{props.agent.fee}</td>
      <td>{props.agent.sales}</td>
      <td>
        <Link className="btn btn-link" to={`/admin/edit/${props.agent._id}`}>Edit &#x1F58A;</Link> |
        <button className="btn btn-link"
          onClick={() => {
            handleShowModal()
          }}
        >
          Delete &#128465;
        </button>
      </td>
    </tr>
  );
}
const headers = { "authorization": "Bearer " + localStorage.getItem("token") }
export default function AgentsList() {
  const [agents, setAgents] = useState([]);
  const [deleteState, setDeleteState] = useState("undefined")
  
  // This method fetches the records from the database.
  useEffect(() => {
    async function getAgents() {
      const response = await fetch(`http://localhost:5000/agents`, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const agents = await response.json();
      setAgents(agents);
    }
    getAgents();
    return;
  }, [agents.length]);
  // This method will delete a record
  async function deleteAgent(id) {
    setDeleteState("undefined")
    await fetch(`http://localhost:5000/agents/${id}`, {
      method: "DELETE",
      headers: headers,
    })
    .catch(error => {
      setDeleteState("fail")
      console.log(error)
      return;
    });
    const newAgents = agents.filter((el) => el._id !== id);
    setDeleteState("success")
    setAgents(newAgents);
  }
  // This method will map out the agents on the table
  function agentList() {
    return agents.map((agent) => {
      return (
        <Agent
          agent={agent}
          deleteAgent={() => deleteAgent(agent._id)}
          key={agent._id}
        />
      );
    });
  }
  // This following section will display the table with the agents.
  return (
    <div>
      {deleteState === "success" && <Alert message="You successfully deleted an agent!" variant="success" duration={3000} />}
      {deleteState === "fail" && <Alert message="There was a problem creating the new agent" variant="danger" duration={5000} />}
      <h3 style={{ textAlign: "center" }}>Agents</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Rating</th>
            <th>Fee</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{agentList()}</tbody>
      </table>
    </div>
  );
}