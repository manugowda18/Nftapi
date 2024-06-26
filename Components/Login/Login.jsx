import React, { useState } from "react";
import axios from "axios";

import { FormSVG, Lock } from "../SVG/index";
import Style from "./Login.module.css";
import { Notification } from "../index";



const Login = ({ setLogin, setSignup, notification, setNotification }) => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const apiLogin = async (e) => {
    e.preventDefault();

    if (user.email == "" || user.password == "") {
      return setNotification("Please enter your email and password");
    }

    try {
      const response = await axios({
        method: "POST",
        url: `/api/v1/users/login`,
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });
      if (response.data.status == "success") {
        setNotification("Successfully logged in");
        localStorage.setItem("NFTApi Token", response.data.token);
        setLogin(false);
        setNotification("");
        window.location.reload();
      } else if (response.data.status == "fail") {
        setNotification(response.data.message);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div class={Style.card}>
        <div class={Style.card2}>
          <form class={Style.form}>
            <p id="heading" className={Style.heading}>
              Login
            </p>
            <div class={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div class={Style.btn}>
              <button class={Style.button1} onClick={() => setLogin(false)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                class={Style.button2}
                onClick={() => (setSignup(true), setLogin(false))}
              >
                SignUp
              </button>
            </div>

            <button
              class={Style.button3}
              onClick={(e) => apiLogin(e)}
            >
              LogIn
            </button>
          </form>
        </div>
      </div>
      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default Login;
