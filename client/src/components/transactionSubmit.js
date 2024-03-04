import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

export default function TransactionSubmit({agents, onTransactionSubmit}) {
    const [form, setForm] = useState({
        agent_id :"",
        amount: 0,
    });
    const [selectedAgent, setSelectedAgent] = useState(null);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const handleAgentClick = (agent) => {
        setSelectedAgent(agent);
        updateForm({ agent_id: agent._id })
      };

    // This will send a post request to update the data in the database.
    async function onSubmit(e) {
        e.preventDefault();
        if (form.agent_id ===""){
            return
        }
        const newSale = {...form}
        try {
            const response = await fetch("http://localhost:5000/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newSale),
            })
            if (response.status === 200) {
                onTransactionSubmit ()
            }
        }
        catch (error) {
            console.log(error)
            window.alert(error);
            return;
        }
    }

    return (
        <div>
            <h5 style={{ textAlign: "center", color: "rgb(170, 69, 69)", marginBottom: "30px" }}>Add your transaction</h5>
            <form onSubmit={onSubmit} style={{ textAlign: "center" }} >
                <div className="form-group" style={{ marginBottom: "40px" }}>
                    <label htmlFor="amount">Transaction amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        min="0"
                        style={{ width: "80%", height: "50px", textAlign: 'center', margin: '0 auto' }}
                        value={form.amount}
                        onChange={(e) => updateForm({ amount: Number(e.target.value) })}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "40px" }}>
                    <Dropdown >
                        <Dropdown.Toggle variant="danger" id="agents" style={{ width: "80%", height: "50px", textAlign: 'center', margin: '0 auto', marginBottom: "40px" }}>
                            {selectedAgent ? `${selectedAgent.first_name} ${selectedAgent.last_name} (${selectedAgent._id}) ` : "Select an agent"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {agents.map((agent, index) => (
                                <Dropdown.Item key={index} onClick={() => handleAgentClick(agent)}>
                                    {`${agent.first_name} ${agent.last_name} (${agent._id})`} 
                                </Dropdown.Item>
                                ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <input
                        type="submit"
                        value="Submit transaction"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}