import React, { useState } from "react";

import loginImg from "../assets/login.jpg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-white p-4">
          <h2 className="text-4xl font-bold text-center py-6">BRAND.</h2>

          <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={handleSubmit}
          />

          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Create an account</p>
          </div>
        </form>
      </div>
    </div>
  );
}

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  <form onSubmit={onSubmit}>
    <div className="flex flex-col py-2">
      <label>{label}</label>
      <input
        className="border p-2"
        type="text"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      />
    </div>
    <div className="flex flex-col py-2">
      <label>Password</label>
      <input
        className="border p-2"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
    </div>
    <button
      type="submit"
      className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
    >
      Sign In
    </button>
  </form>;
};
