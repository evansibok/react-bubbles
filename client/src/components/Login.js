import React, { useState } from "react";


const Login = () => {
  const initialForm = {
    username: "",
    password: "",
  }
  const [loginForm, setLoginForm] = useState(initialForm);

  const inputChange = evt => {
    const { name, value } = evt.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={loginForm.username}
            onChange={inputChange} />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={inputChange} />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
