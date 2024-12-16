import React from "react";

import { AuthContext } from "../context/AuthProvider";
import { useEffect, useState, useContext } from "react";
import logo from "/public/img/logo-genaid.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";
import { IoLogoGoogle } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import Nav from "../components/Navbar/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthProvider from "../context/AuthProvider.jsx";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AuthContext);

  useEffect(() => {
    const validateEmail = () => {
      if (email === "" && emailTouched) {
        setEmailError("Email is required");
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailTouched && !emailRegex.test(email)) {
          setEmailError("Invalid email address");
        } else {
          setEmailError("");
        }
      }
    };

    const validatePassword = () => {
      if (password === "" && passwordTouched) {
        setPasswordError("Password is required");
      } else if (passwordTouched && password.length < 6) {
        setPasswordError(
          "Invalid password, must be at least 6 characters long"
        );
      } else {
        setPasswordError("");
      }
    };

    validateEmail();
    validatePassword();
  }, [email, password, emailTouched, passwordTouched]);

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (!email) {
      setEmailError("Email is required");
      setEmailTouched(true);
    }
    if (!password) {
      setPasswordError("Password is required");
      setPasswordTouched(true);
    }

    if (!emailError && !passwordError && email && password) {
      const newEntry = { email, password };
      setSubmittedData([...submittedData, newEntry]);

      // alert(`"Login successful." Your email ${email} has been submitted.`);


      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
       alert(response.data.message);
      } else {
        alert(response.data.message);
      }

      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setEmailTouched(false);
      setPasswordTouched(false);
    } else {
      alert("Please fill in all required fields .");
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }

  }, [token]);


  function handleHidePassword(e) {
    e.preventDefault();
    setHidePassword(!hidePassword);
  }

  return (
    <div>
      <Nav back />

      <div className=" flex flex-col items-center justify-center min-h-screen lg:flex lg:flex-row  lg:gap-1 lg:py-40 ">
        <section className="flex justify-center items-center mb-5 ">
          <img src={logo} alt="logo" className="w-[60%] lg:w-[80%]" />
        </section>

        <form
          className="bg-white p-6  shadow-xl w-[80%]  max-w-sm rounded-3xl  lg:mr-24 "
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h1 className="mb-4 text-3xl font-bold  ">Login Details</h1>
          <div className=" mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className=" relative mb-4">
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailTouched(true)}
                autoComplete="chrome-off"
                className={`shadow appearance-none border  rounded w-full pr-10 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emailError ? "border-orange-400" : ""
                }`}
              />
              <FaUser className="absolute right-3 bottom-2 text-2xl opacity-30 " />
            </div>
            {emailError && emailTouched && (
              <p className="text-red-500 text-xs italic mt-2">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className=" relative mb-4">
              <input
                type={hidePassword ? "password" : "text"}
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordTouched(true)} // Set passwordTouched to true on focus
                autoComplete="new-password"
                className={`shadow appearance-none border rounded w-full pr-10 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  passwordError ? "border-orange-400" : ""
                }`}
              />
              <FaLock className=" absolute right-3 bottom-2 text-2xl opacity-30" />
            </div>

            <div className="flex items-center mt-2 gap-28 ">
              <button
                onClick={handleHidePassword}
                className="text-sm text-blue-500 hover:underline focus:outline-none"
              >
                {hidePassword ? "Show Password" : "Hide Password"}
              </button>
              <button className=" text-sm"> Foget password ?</button>
            </div>
            {passwordError && passwordTouched && (
              <p className="text-red-500 text-xs italic mt-2">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-ga-primary
           hover:bg-ga-secondary text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline rounded-md text-2xl  h-16"
            >
              Login
            </button>
          </div>
          <p className="m-4 text-center">Or Sign in With</p>

          <div className=" flex justify-center gap-6 text-3xl ">
            <IoLogoGoogle />
            <FaFacebookF />
            <FaApple />
          </div>
          <div className="flex">
            <p className="m-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700">
                Register Now
              </Link>
            </p>
            {/* <button className="text-sky-600">Register Now</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
