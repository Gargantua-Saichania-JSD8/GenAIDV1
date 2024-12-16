import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "/public/img/logo-genaid.png";
import {  FaUser, FaLock } from "react-icons/fa";
import { IoIosMail,  } from "react-icons/io";
import { MdOutlinePhoneIphone } from "react-icons/md";
import Nav from "../components/Navbar/Nav";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRePassword, setHideRePassword] = useState(true);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setRepasswordError] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [repasswordTouched, setRepasswordTouched] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateName = () => {
      if (name === "" && nameTouched) {
        setNameError("Name is required");
      } else {
        setNameError("");
      }
    };

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      if (email === "" && emailTouched) {
        setEmailError("Email is required");
      } else if (emailTouched && !emailRegex.test(email)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    };

    const validatePhoneNumber = () => {
      const phoneRegex = /^[0-9]{10}$/;
      if (phoneNumber === "" && phoneNumberTouched) {
        setPhoneNumberError("Phone number is required");
      } else if (phoneNumberTouched && !phoneRegex.test(phoneNumber)) {
        setPhoneNumberError("Invalid phone number");
      } else {
        setPhoneNumberError("");
      }
    };

    const validatePassword = () => {
      if (password === "" && passwordTouched) {
        setPasswordError("Password is required");
      } else if (passwordTouched && password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
      } else {
        setPasswordError("");
      }
    };

    const validateRepassword = () => {
      if (repassword === "" && repasswordTouched) {
        setRepasswordError("Confirmation password is required");
      } else if (repasswordTouched && repassword !== password) {
        setRepasswordError("Passwords do not match");
      } else {
        setRepasswordError("");
      }
    };

    validateName();
    validateEmail();
    validatePhoneNumber();
    validatePassword();
    validateRepassword();
  }, [name, email, phoneNumber, password, repassword, nameTouched, emailTouched, phoneNumberTouched, passwordTouched, repasswordTouched]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !password || !repassword) {
      alert("Please fill in all required fields ");
      return;
    }

    const newEntry = { name, email, phoneNumber, password, repassword };
    setSubmittedData([...submittedData, newEntry]);

    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        fullname: name,
        email,
        phone: phoneNumber,
        password,
        repassword,
      });

      if (response.data) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        alert("Registration successful.");
      }
    } catch (error) {
      console.error(error);
      alert("There was an error with your registration.");
    }

    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setRepassword("");
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setPasswordError("");
    setRepasswordError("");
    setNameTouched(false);
    setEmailTouched(false);
    setPhoneNumberTouched(false);
    setPasswordTouched(false);
    setRepasswordTouched(false);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleHidePassword = (e) => {
    e.preventDefault();
    setHidePassword(!hidePassword);
  };

  const handleHideRePassword = (e) => {
    e.preventDefault();
    setHideRePassword(!hideRePassword);
  };

  return (
    <div>
      <Nav back />

      <div className="flex flex-col items-center justify-center min-h-screen lg:flex lg:flex-row lg:gap-1 lg:py-40  ">
        <section className="flex justify-center items-center mb-5">
          <img src={logo} alt="logo" className="w-[60%] lg:w-[80%]" />
        </section>
        
  

        <form
          className="bg-white p-28 shadow-xl w-[80%]  rounded-3xl lg:mr-24 max-w-xl" 
          onSubmit={handleSubmit}
          autoComplete="off"
        >
           <h1 className="mb-2 text-3xl font-bold text-center ">Lets Register Account</h1>
          <p className="mb-1 text-2xl font-medium text-center">
            Hello User, you have a greatful journey
          </p>

          <h1 className="m-7 font-bold text-2xl ml-2">Register</h1>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
              Name
            </label>
            <div className="relative mb-4 w-[85%] mx-auto">
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameTouched(true)}
                className={`shadow appearance-none border rounded   w-full pr-10 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  nameError ? "border-orange-400" : ""
                }`}
              />
              <FaUser className="absolute right-3 bottom-2 text-2xl opacity-30" />
            </div>
            {nameError && nameTouched && (
              <p className="text-red-500 text-xs italic mt-2">{nameError}</p>
            )}
          </div>

          <div className="mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
              Email
            </label>
            <div className="relative w-[85%] mx-auto">
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailTouched(true)}
                className={`shadow appearance-none border rounded w-full pr-10 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emailError ? "border-orange-400" : ""
                }`}
              />
              <IoIosMail className="absolute right-3 bottom-2 text-2xl opacity-30" />
            </div>
            {emailError && emailTouched && (
              <p className="text-red-500 text-xs italic mt-2">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
              Phone Number
            </label>
            <div className="relative w-[85%] mx-auto">
              <input
                type="text"
                value={phoneNumber}
                placeholder="Enter your phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setPhoneNumberTouched(true)}
                className={`shadow appearance-none border rounded w-full pr-10 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  phoneNumberError ? "border-orange-400" : ""
                }`}
              />
              <MdOutlinePhoneIphone  className="absolute right-3 bottom-2 text-2xl opacity-30" />
            </div>
            {phoneNumberError && phoneNumberTouched && (
              <p className="text-red-500 text-xs italic mt-2">
                {phoneNumberError}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-6 ">
              Password
            </label>
            <div className="relative w-[85%] mx-auto">
              <input        
              type={hidePassword ? "password" : "text"}
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordTouched(true)}
              className={`shadow appearance-none border rounded w-full pr-10 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? "border-orange-400" : ""
              }`}
            />
            <FaLock className="absolute right-3 bottom-2 text-2xl opacity-30" />
          </div>
          <div className="flex items-center mt-2 gap-28">
            <button
              onClick={handleHidePassword}
              className="text-sm text-blue-500 hover:underline focus:outline-none ml-6"
            >
              {hidePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
          {passwordError && passwordTouched && (
            <p className="text-red-500 text-xs italic mt-2">{passwordError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
            Confirm Password
          </label>
          <div className="relative w-[85%] mx-auto">
            <input
              type={hideRePassword ? "password" : "text"}
              value={repassword}
              placeholder="Confirm your password"
              onChange={(e) => setRepassword(e.target.value)}
              onFocus={() => setRepasswordTouched(true)}
              className={` shadow appearance-none border rounded w-full pr-10 py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                repasswordError ? "border-orange-400" : ""
              }`}
            />
            <FaLock className="absolute right-3 bottom-2 text-2xl opacity-30" />
          </div>
          <div className="flex items-center mt-2 gap-28">
            <button
              onClick={handleHideRePassword}
              className="text-sm text-blue-500 hover:underline focus:outline-none ml-6"
            >
              {hideRePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
          {repasswordError && repasswordTouched && (
            <p className="text-red-500 text-xs italic mt-2">{repasswordError}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-ga-primary hover:bg-ga-secondary text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-md text-2xl h-16"
          >
            Register
          </button>
        </div>

        
      </form>
    </div>
  </div>
  );
};

export default Register;

