import React, { useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";
import SessionTokenProvider from "./sessionTokenProvider";
import {UserContext} from "./userContext";

export default function SessionTokenValidator(props) {
    const {setUser} = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(["session_token"]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        async function validateSessionToken() {
            const sessionToken = cookies.session_token
            const response = await fetch(`http://localhost:5000/validate_token/${sessionToken}`, {
                method: "GET",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json",
                },
            })
            if (response.status === 200) {
                const payload = await response.json()
                console.log(response)
                if (payload["data"]["valid"]) {
                    setIsLoading(false)
                    setIsError(false)
                    setUser({first_name : payload["data"]["user"]["first_name"]})
                }
                else {
                    console.log("removing")
                    removeCookie("session_token")
                    setIsError(true)
                }
            }
            else {
                removeCookie("session_token")
                setIsError(true)
            }
        }
        if (cookies.session_token) {
            validateSessionToken();
        }
        else {
            setIsLoading(false)
        }
    }, [setIsLoading, cookies.session_token, setIsError, removeCookie]);
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <Navigate to="/authenticate" replace />
    }
    return (
        <SessionTokenProvider>
            {props.children}
        </SessionTokenProvider>
    )
}