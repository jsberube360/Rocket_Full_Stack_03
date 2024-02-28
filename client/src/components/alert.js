import React, { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

const CustomAlert = ({ duration, variant, message, onClose }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if (duration === undefined) {
            return
        }
        const timer = setTimeout(() => {
            setShowAlert(false);
            if (onClose) {
                onClose()
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, variant, message, onClose]);

    return (
        <>
            {showAlert && <Alert variant={variant} onClose={() => setShowAlert(false)}>
                <p>{message} </p>


            </Alert>}
        </>
    );
};

export default CustomAlert