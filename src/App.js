import "./App.css";
import Auth0ProviderWithHistory from "./auth0Provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {isLoading} = useAuth0()

  if(isLoading) return <div>Loading...</div>

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <LoginButton />
      <LogoutButton />
      <Profile /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
