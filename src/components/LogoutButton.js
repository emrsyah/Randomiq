import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() => logout()}
      className="bg-[#FFC300] rounded-md hover:bg-yellow-500 font-semibold px-9 py-2"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
