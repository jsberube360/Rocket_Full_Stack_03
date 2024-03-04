import {useState, useEffect} from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TransactionList from './transactionList';
import TransactionSubmit from './transactionSubmit';

export default function Transaction() {
    const [agents, setAgents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [transactionCount, setTransactionCount] = useState(0)
    useEffect(() => {
        async function getAgents() {
            try {
                const response = await fetch("http://localhost:5000/agents")
                const agents = await response.json();
                setAgents(agents)
                setIsLoading(false)
            }
            catch (error) {
                window.alert(error);
                return;
            }
        }
        getAgents();
    }, [agents.length]);

    return (
        <div>
            <hr style={{ margin: "0px auto", width: "100%", borderWidth: "3px", color: "#0a65a0", marginBottom: "20px" }} />
            <h1 style={{ textAlign: "center", color: "#0a65a0", marginBottom: "20px" }}>Transactions</h1>
            {isLoading && <div>Loading...</div>}
            {!isLoading && 
                <Container >
                    <Row>
                        <Col>
                            <TransactionList agents={agents} transactionCount={transactionCount} />
                        </Col>
                        <Col>
                            <TransactionSubmit agents={agents} onTransactionSubmit={()=> setTransactionCount(transactionCount + 1)} />
                        </Col>
                    </Row>
                </Container>}
        </div>
    )
}
