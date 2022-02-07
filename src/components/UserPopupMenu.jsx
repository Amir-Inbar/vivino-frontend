import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService } from "../services/auth.service";
import { tryRequire } from "../services/util.service";
import { setUser } from "../store/actions/userActions";

export const UserPopupMenu = () => {
  const rtl = document.dir === "rtl";
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userModule.user);
  const elProfile = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const logout = async () => {
    await authService.logout();
    dispatch(setUser(null));
  };

  const UserMenu = ({ isActive }) => {
    if (!elProfile.current) return null;
    const el = elProfile.current;
    const top = el.offsetTop + el.clientHeight + 8;
    const left = el.offsetLeft;
    const right = window.innerWidth - el.offsetLeft - 32;
    const height = document.documentElement.scrollHeight;
    const style = rtl
      ? {
          top: `${top}px`,
          left: `${left}px`,
        }
      : {
          top: `${top}px`,
          right: `${right}px`,
        };
    return isActive ? (
      <div
        className="background-dimm"
        style={{ height: height + "px" }}
        onClick={() => setIsActive(false)}
      >
        <div
          className="user-quick-menu"
          style={style}
          onClick={() => setIsActive(false)}
        >
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    ) : null;
  };

  const toggleUserMenu = async () => {
    if (user) {
      setIsActive(!isActive);
    } else history.push("/login");
  };

  return (
    <>
      <img
        ref={elProfile}
        className="login"
        src={user?.image || tryRequire("imgs/icons/user-profile.png")}
        onClick={toggleUserMenu}
        onError={({ target }) =>
          (target.src = tryRequire("imgs/icons/user-profile.png"))
        }
      />
      <UserMenu isActive={isActive} />
    </>
  );
};
