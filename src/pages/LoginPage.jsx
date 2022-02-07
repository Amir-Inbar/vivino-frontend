import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authService } from "../services/auth.service";
import { setUser } from "../store/actions/userActions";

export const LoginPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.wineModule.user);

  const submit = async () => {
    try {
      const user = isSignUpMode
        ? await authService.signup({ username, fullname, password })
        : await authService.login({ username, password });
      if (user) {
        dispatch(setUser(user));
        history.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="login-section">
      <div className="login">
        <p className="title">Sign up</p>
        <form>
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
          <span></span> Login with Gmail
        </button>
        <hr />
        <ul className="sign-in">
          <li>Can't log in?</li>
          <li onClick={() => setIsSignUpMode(!isSignUpMode)}>
            {isSignUpMode ? "Back" : "Sign up for free"}
          </li>
        </ul>
      </div>
    </section>
  );
};
