import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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
  const modalDeleteAgent = () => {
    props.deleteAgent()
    handleCloseModal()
  }
  return (
    <tr>
      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        message="Are you sure you want to delete this agent?"
        title="Delete agent"
        action="Confirm deletion"
        handleAction={modalDeleteAgent}
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


export default function AgentsList() {
  const [agents, setAgents] = useState([]);
  const [deleteState, setDeleteState] = useState("undefined")
  const navigate = useNavigate();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getAgents() {
      try {
        const response = await fetch("http://localhost:5000/agents")
        const agents = await response.json();
        setAgents(agents);
      }
      catch (error) {
        window.alert(error);
        return;
      }
    }
    getAgents();
    return;
  }, [agents.length]);
  // This method will delete a record
  async function deleteAgent(id) {
    try {
      await fetch(`http://localhost:5000/agents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      const newAgents = agents.filter((el) => el._id !== id);
      setDeleteState("success")
      setAgents(newAgents);
    }

    catch (error) {
      setDeleteState("fail")
      console.log(error)
    }
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
       <hr style={{ margin: "0px auto", width: "100%", borderWidth: "3px", color: "#0a65a0", marginBottom: "15px" }} />
      {deleteState === "success" && <Alert message="You successfully deleted an agent!" variant="success" duration={3000} onClose={() => setDeleteState("undefined")} />}
      {deleteState === "fail" && <Alert message="There was a problem deleting this agent" variant="danger" duration={5000} onClose={() => setDeleteState("undefined")} />}
      <h1 style={{ textAlign: "center", color: "#0a65a0", marginBottom: "20px" }}>Agents</h1>
      <table className="table table-striped">
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
      <Button variant="primary" onClick={() => navigate("/admin/create")} style={{ position: "relative", left: "46%" }}>
        Create agent
      </Button>
    </div>
  );
}