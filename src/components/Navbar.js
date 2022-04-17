import React from "react";
import logo from "../assets/randomiq-logo-top.svg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="bg-white px-16 py-7 flex justify-between items-center border-b-[1px] border-gray-300">
      <img
        src={logo}
        alt=""
        onClick={() => navigate("/")}
        className="cursor-pointer"
      />
      <div className="flex gap-10 items-center">
        <a
          href="/"
          className={`navlink ${
            location.pathname === "/" && "font-medium opacity-100"
          } `}
        >
          randomize
        </a>
        <a
          href="/challenges"
          className={`navlink ${
            location.pathname === "/challenges" && "font-medium opacity-100"
          } `}
        >
          your challenges
        </a>
        <a
          href="/explores"
          className={`navlink ${
            location.pathname === "/explores" && "font-medium opacity-100"
          } `}
        >
          explores
        </a>
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </div>
    </nav>
  );
}

export default Navbar;
