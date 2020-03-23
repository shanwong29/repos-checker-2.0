import React from "react";
import classes from "./Login.module.css";

const Login = props => {
  let createdRef = "";
  return (
    <form
      className={classes.login_form}
      onSubmit={e => props.login(e, createdRef)}
    >
      <input
        type="password"
        name="token"
        ref={domEl => {
          createdRef = domEl;
        }}
        placeholder="Paste your GitHub token"
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
