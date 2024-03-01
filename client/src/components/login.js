// imports 
import React, { useState } from "react";
import Alert from "./alert";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode"

// login page

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loginState, setLoginState]  = useState ("undefined")
    // Tupdate the state properties of the login form
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }

    const navigate = useNavigate();
    async function onSubmit (e) {
        e.preventDefault()
        // When a post request is sent to verify if the user exists in the database, receives a token
        const response = await fetch ("http://localhost:5000/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
        if (response.status === 200) {
            const token = await response.json()
            localStorage.setItem("token", token["access_token"])
            const accessTokendDecoded = jwtDecode(localStorage.getItem("token"))
            const userId = accessTokendDecoded["user_id"]
            localStorage.setItem("userId", userId)
            setLoginState ("success")
            
        }
        else if (response.status === 401) {
            setLoginState ("fail")
        }
        else if (response.status === 404) {
            navigate("/unauthorized")
        }
    }
    
    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <hr style={{ margin: "0px auto", width: "100%", borderWidth: "3px", color: "#0a65a0", marginBottom: "15px" }} />
            {loginState === "success" && <Alert message="Successfully connected! You will be redirected shortly!" variant="success" duration={3000} onClose={()=>navigate("/admin")}/>}
            {loginState === "fail" && <Alert message="Invalid password" variant="danger" duration={3000} onClose={()=>setLoginState("undefined")}/>}
            <h1 style={{ textAlign: "center", color: "#0a65a0", marginBottom: "20px" }}>Login</h1>
            <form onSubmit={onSubmit} style={{ textAlign: "center"}} >
                <div className="form-group" >
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        style={{ width:"40%", textAlign: 'center', margin: '0 auto'}}
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        style={{ width:"40%", textAlign: 'center', margin: '0 auto'}}
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <br />
               

                <div className="form-group">
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
