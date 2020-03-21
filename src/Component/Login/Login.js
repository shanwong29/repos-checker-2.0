import React from "react";
import classes from "./Login.module.css";

const Login = props => {
  return (
    <form className={classes.login_form} onSubmit={props.login}>
      <input
        type="password"
        name="token"
        value={props.token}
        onChange={e => {
          props.setToken(e.target.value);
        }}
        placeholder="Paste your GitHub token"
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
