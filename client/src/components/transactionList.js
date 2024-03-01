import React, { useEffect, useState } from "react";

const Transactions = ({ agent, transaction }) => {

    return (
        <tr>
            <td>{agent.first_name} {agent.last_name}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.createdAt.substring(0, 10)}</td>
        </tr>
    );
}

export default function TransactionList({ agents, transactionCount }) {
    const [transactions, setTransactions] = useState([]);
    // This method fetches the records from the database.
    useEffect(() => {
        async function getTransactions() {
            try {
                const response = await fetch("http://localhost:5000/transaction-data")
                if (response.status !== 200) {
                    throw "failed to fetch"
                }
                const transactions = await response.json();
                setTransactions(transactions);

            }
            catch (error) {
                window.alert(error);
                return;
            }
        }
        getTransactions();
        return;
    }, [transactions.length, transactionCount]);

    // This method will map out the agents on the table
    function transactionList() {
        return transactions.map((transaction) => {
            return (
                <Transactions
                    agent={agents.find((el) => el._id === transaction.agent_id)}
                    transaction={transaction}
                    key={transaction._id}
                />
            );
        });
    }

    return (
        <div>
            <h5 style={{ textAlign: "center", color: "rgb(170, 69, 69)" }}>Last 10 transactions</h5>
            <table className="table table-striped" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Agent's name</th>
                        <th>Sale amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>{transactionList()}</tbody>
            </table>
        </div>
    );
}