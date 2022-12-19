import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import DemoUser from "../Demo";
import './loginFormModal.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-container">

      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
          ))}
      </ul>
      <label>
        Username or Email
        <input
          className="input"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      <label>
        Password
        <input
        className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <button className="login-btn" type="submit">Log In</button>
          </div>
          <DemoUser />
    </form>
  );
}

export default LoginForm;
