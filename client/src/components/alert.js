import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = ({ duration, variant, message }) => {
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (duration === undefined) {
            return
        }
        const timer = setTimeout(() => {
            setShowAlert(false);
            if (variant === "success" && message !=="You successfully deleted an agent!") {
                navigate("/admin");
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, variant, message, navigate]);

    return (
        <>
            {showAlert && <Alert variant={variant} onClose={() => setShowAlert(false)}>
                <p>{message} </p>


            </Alert>}
        </>
    );
};

export default CustomAlert