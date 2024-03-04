//imports 
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router";


export default function SessionTokenProvider(props) {
    const [cookies, setCookie] = useCookies(["session_token"]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchSessionToken() {
            const userId = localStorage.getItem("userId")
            const response = await fetch(`http://localhost:5000/session/${userId}`, {
                method: "POST",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json",
                },
            })
            if (response.status === 200) {
                const token = await response.json()
                setCookie("session_token", token["data"]["token"])
                setIsLoading(false)
            }
            else {
                navigate("/authenticate")
            }
        }
        if (!cookies.session_token) {
            fetchSessionToken()
        }
        else {
            setIsLoading(false)
        }
    },[cookies.session_token, navigate, setIsLoading, setCookie]);
    if (isLoading) {
        return <div>Loading...</div>
    }
    return props.children
}