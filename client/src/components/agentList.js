import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Agent = (props) => (
  <tr>
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
          props.deleteAgent(props.agent._id);
        }}
      >
        Delete &#128465; 
      </button>
    </td>
  </tr>
);
const headers = { "authorization": "Bearer " + localStorage.getItem("token") }
export default function AgentsList() {
  const [agents, setAgents] = useState([]);
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
    await fetch(`http://localhost:5000/agents/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    const newAgents = agents.filter((el) => el._id !== id);
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