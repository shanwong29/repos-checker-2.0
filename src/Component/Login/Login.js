import React, { useState } from "react";

const Login = () => {
  const [token, setToken] = useState("");

  const tokenSubmit = e => {
    e.preventDefault();
    localStorage.setItem("token", token);
    window.location.reload();
  };

  return (
    <section>
      <form onSubmit={tokenSubmit}>
        <input
          type="password"
          name="token"
          value={token}
          onChange={e => {
            setToken(e.target.value);
          }}
          placeholder="Paste your GitHub token"
        />
        <button>Login</button>
      </form>
    </section>
  );
};

export default Login;
