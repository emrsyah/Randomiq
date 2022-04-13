import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";
import Challenges from "./pages/Challenges";
import { ToastContainer } from "react-toastify";
import loading from "./assets/loading.svg";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <img src={loading} alt="" />
      </div>
    );

  return (
    <RecoilRoot>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenges />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
