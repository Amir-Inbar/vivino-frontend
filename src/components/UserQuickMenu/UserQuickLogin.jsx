import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../services/auth.service";
import { setUser } from "../../store/actions/userActions";

export const QuickLogin = ({ isActive, close }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [isAfterTry, setIsAfterTry] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.wineModule.user);
  const height = document.documentElement.scrollHeight;
  const top = document.documentElement.scrollTop + window.innerHeight / 2;

  useEffect(() => {
    setLoginUser({});
    setIsAfterTry(false);
  }, [isActive]);

  const submit = async () => {
    try {
      const user = isSignUpMode
        ? await authService.signup(loginUser)
        : await authService.login(loginUser);
      if (user) {
        dispatch(setUser(user));
        close(false);
      } else {
        setIsAfterTry(true);
        console.log("login failed");
      }
    } catch (err) {
      console.log(err);
    }
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
            placeholder="Enter email address"
            className="username"
            value={loginUser?.username || ""}
            onChange={(ev) =>
              setLoginUser({ ...loginUser, username: ev.target.value })
            }
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          {isSignUpMode ? (
            <input
              placeholder="Enter Full Name"
              className="fullname"
              value={loginUser?.fullname || ""}
              onChange={(ev) =>
                setLoginUser({ ...loginUser, fullname: ev.target.value })
              }
            />
          ) : null}
          <div>
            <input
              placeholder="Enter Password"
              autoComplete=""
              type="password"
              className="password"
              value={loginUser?.password || ""}
              onChange={(ev) =>
                setLoginUser({ ...loginUser, password: ev.target.value })
              }
            />
          </div>
          {isAfterTry ? (
            <p className="warning">Login failed, wrong username or password</p>
          ) : null}
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
