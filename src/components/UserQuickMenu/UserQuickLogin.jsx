import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../services/auth.service";
import { setUser } from "../../store/actions/userActions";

export const QuickLogin = ({ isActive, close }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.wineModule.user);
  const height = document.documentElement.scrollHeight;
  const top = document.documentElement.scrollTop + window.innerHeight / 2;

  const submit = async () => {
    try {
      const user = isSignUpMode
        ? await authService.signup({ username, fullname, password })
        : await authService.login({ username, password });
      if (user) {
        dispatch(setUser(user));
      }
    } catch (err) {
      console.log(err);
    }
    close(false);
  };

  useEffect(() => {
    close();
  }, [user]);

  return isActive ? (
    <div
      className="background-dimm"
      style={{ height: height + "px" }}
      onClick={close}
    >
      <div
        className="quick-login-popup hover-box"
        style={{ top: `${top}px` }}
        onClick={(ev) => ev.stopPropagation()}
      >
        <p className="title">{isSignUpMode ? "Sign up" : "Sign in"}</p>
        <form onSubmit={submit}>
          <input
            placeholder="Enter Username"
            className="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          {isSignUpMode ? (
            <input
              placeholder="Enter Full Name"
              className="fullname"
              value={fullname}
              onChange={(ev) => setFullname(ev.target.value)}
            />
          ) : null}
          <div>
            <input
              placeholder="Enter Password"
              autoComplete=""
              type="password"
              className="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button type="submit" onClick={submit}>
            {isSignUpMode ? "Sign up" : "Log in"}
          </button>
        </form>
        <p className="alternative">OR</p>
        <button className="gmail-login-btn">
          <span>{isSignUpMode ? "Sign up" : "Login"} with Gmail</span>
        </button>
        <button className="facebook-login-btn">
          <span>{isSignUpMode ? "Sign up" : "Login"} with Facebook</span>
        </button>
        <hr />
        <ul className="sign-in">
          <li>Can't log in?</li>
          <li onClick={() => setIsSignUpMode(!isSignUpMode)}>
            {isSignUpMode ? "Back" : "Sign up for free"}
          </li>
        </ul>
      </div>
    </div>
  ) : null;
};
