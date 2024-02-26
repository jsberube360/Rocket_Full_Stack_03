import { useNavigate } from "react-router";
import React from "react";

export default function UnauthorizedPage() {
    const navigate = useNavigate();
    function onClick (){
        navigate("/authenticate")
    }
    return (
        <div>
            <h3 style={{textAlign: "center"}}>Unauthorized access</h3>
            <h6>This section is reserved for admin only</h6>

            <button onClick={onClick} className="btn btn-primary"> Return to login </button>
        </div>
    );
}


