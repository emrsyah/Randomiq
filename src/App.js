import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";
import Challenges from "./pages/Challenges";
import { ToastContainer } from "react-toastify";
import logo from "./assets/randomiq-logo-top.svg";
import Modal from "./components/Modal";
import lottiejson from './assets/99853-spinner.json'
import { useEffect } from "react";
import Lottie from "lottie-web";


function App() {
  const { isLoading } = useAuth0();
  useEffect(()=>{
    Lottie.loadAnimation({
      container: document.querySelector('#lottie-container'),
      animationData: lottiejson,
    })
  },[])

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh] flex-col">
        {/* <img src={loading} alt="" /> */}
        <img src={logo} alt="" className="h-30" />
        <div id="lottie-container" className="w-20 h-20"/>
      </div>
    );

  return (
    <RecoilRoot>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/modal" element={<Modal />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
