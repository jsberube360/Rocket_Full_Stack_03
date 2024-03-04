import { useNavigate } from "react-router";
import React from "react";
import Card from './card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AdminPage() {
    const navigate = useNavigate();

    return (
        <div>
            <hr style={{ margin: "0px auto", width:"100%", borderWidth: "3px" , color: "#0a65a0" }}/>
            <h3 style={{ textAlign: "center", color:"#0a65a0"}}>Links to our different pages</h3>
            <p></p>
            <Container>
                <Row>
                    <Col>
                        <Card title="Agents list"
                            text="Grid that summarizes the most important informations on all our agents such as rating, fees, sales, email, etc."
                            src="businessman.jpg"
                            width="300px"
                            height="450px"
                            variant="danger"
                            button="View"
                            top="2%"
                            left="0%"
                            action={()=>navigate("/admin/list")}
                        ></Card>
                    </Col>
                    <Col>
                        <Card title="Transaction table"
                            text="Table that shows you the amount of the last 10 transactions made by our agents and who made them."
                            src="transaction.png"
                            width="300px"
                            height="450px"
                            variant="danger"
                            button="View"
                            top="2%"
                            left="10%"
                            action={()=>navigate("/admin/transaction")}
                        ></Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}