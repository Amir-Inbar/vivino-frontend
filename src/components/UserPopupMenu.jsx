import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService } from "../services/auth.service";
import { tryRequire } from "../services/util.service";
import { setUser } from "../store/actions/userActions";
import { QuickLogin } from "./QuickLogin";

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

  const UserMenu = ({ isActive, close }) => {
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
        onClick={close}
      >
        <div className="user-quick-menu" style={style} onClick={close}>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    ) : null;
  };

  useEffect(() => {
    if (isActive) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "initial";
  }, [isActive]);

  return (
    <>
      <img
        ref={elProfile}
        className="login"
        src={user?.image || tryRequire("imgs/icons/user-profile.png")}
        onClick={() => setIsActive(!isActive)}
        onError={({ target }) =>
          (target.src = tryRequire("imgs/icons/user-profile.png"))
        }
      />
      <UserMenu isActive={isActive && user} close={() => setIsActive(false)} />
      <QuickLogin
        isActive={isActive && !user}
        close={() => setIsActive(false)}
      />
    </>
  );
};
