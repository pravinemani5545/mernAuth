import React, { useState, useEffect } from "react";
import loginImg from "../assets/login.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Header from "./Header";

export default function Register() {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== cfmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
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
            name={name}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            cfmPassword={cfmPassword}
            setCfmPassword={setCfmPassword}
            label="Register"
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <div className="flex justify-between max-w-[400px] w-full mx-auto">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <NavLink to="/">
              <p>Sign In</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

const Form = ({
  name,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  cfmPassword,
  setCfmPassword,
  onSubmit,
  isLoading,
}) => {
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="max-w-[400px] w-full mx-auto bg-white p-4"
      >
        <h2 className="text-4xl font-bold text-center py-6">Register</h2>
        <div className="flex flex-col py-2">
          <label>Name</label>
          <input
            className="border p-2"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            value={name}
          />
        </div>
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
        <div className="flex flex-col py-2">
          <label>Confirm Password</label>
          <input
            className="border p-2"
            type="cfmPassword"
            onChange={(event) => setCfmPassword(event.target.value)}
            value={cfmPassword}
          />
        </div>
        <button
          type="submit"
          className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Register
        </button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};
