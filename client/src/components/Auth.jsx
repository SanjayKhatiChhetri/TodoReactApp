import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // console.log(cookies);

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form className="aut-conatiner-form">
          <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="email"
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="PASSWORD"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {error && <p>*{error}</p>}
          <input
            type="submit"
            text="GO!"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              color: isLogin ? "rgb(76, 88, 151)" : "rgb(255, 255, 255)",
              backgroundColor: !isLogin
                ? "rgb(108, 115, 148)"
                : "rgb(255, 255, 255)",
            }}
          >
            Sign up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              color: !isLogin ? "rgb(76, 88, 151)" : "rgb(255, 255, 255)",
              backgroundColor: isLogin
                ? "rgb(108, 115, 148) "
                : "rgb(255, 255, 255)  ",
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
