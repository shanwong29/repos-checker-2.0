import React from "react";

const Login = props => {
  return (
    <section>
      <form onSubmit={props.login}>
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
    </section>
  );
};

export default Login;
