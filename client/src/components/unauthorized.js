import { useNavigate } from "react-router";
import React from "react";

export default function UnauthorizedPage() {
    const navigate = useNavigate();
    function onClick (){
        navigate("/authenticate")
    }
    return (
        <div>
            <hr style={{ margin: "0px auto", width:"100%", borderWidth: "3px" , color: "#0a65a0" }}/>
            <h3 style={{textAlign: "center", color:"#0a65a0"}}>Unauthorized access</h3>
            <h6>This section is reserved for admin only</h6>

            <button onClick={onClick} className="btn btn-primary"> Return to login </button>
        </div>
    );
}


