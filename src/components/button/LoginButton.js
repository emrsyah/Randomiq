import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-[#FFC300] rounded-md hover:bg-yellow-500 font-semibold px-9 py-2"
    >
      Login
    </button>
  );
};

export default LoginButton;
