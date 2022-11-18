import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import './index.css'

function DemoUser() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))}
    return(
        <button className="demoButton" onClick={handleSubmit} type="submit">Demo User</button>
    )
}

    export default DemoUser;
