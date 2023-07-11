import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Header from "./Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" src={loginImg} alt="" />
        </div>

        <div className="bg-gray-100 flex flex-col justify-center">
          <Form
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={handleSubmit}
          />
          {isLoading && <Loader />}

          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <NavLink to="/register">
              <p>Create Account</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

const Form = ({ email, setEmail, password, setPassword, label, onSubmit }) => {
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="max-w-[400px] w-full mx-auto bg-white p-4"
      >
        <h2 className="text-4xl font-bold text-center py-6">PUNDAI CORP.</h2>
        <div className="flex flex-col py-2">
          <label>Email</label>
          <input
            className="border p-2"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
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
      </form>
    </div>
  );
};
