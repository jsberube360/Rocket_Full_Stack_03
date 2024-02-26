import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }
    const navigate = useNavigate();
    async function onSubmit (e) {
        e.preventDefault()
        const response = await fetch ("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
        console.log(response)
        if (response.status === 200) {
            const token = await response.json()
            localStorage.setItem("token", token["access_token"])
            navigate("/admin")
        }
        else if (response.status === 401) {
            window.alert("Invalid password");
        }
        else if (response.status === 404) {
            navigate("/unauthorized")
        }
    }
    
   

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3 style={{textAlign: "center"}}>Login</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
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
