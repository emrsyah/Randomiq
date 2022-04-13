import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import waiting from '../assets/waiting.svg'

function Challenges() {
  const { isAuthenticated, isLoading } = useAuth0();
  //   const id = user.sub.substring(user.sub.indexOf("|") + 1);
  //   console.log(id);
  if (!isAuthenticated) {
    return (
      <div className="h-[100vh] flex flex-col justify-between ">
        <Navbar />
        <div className="justify-center flex flex-col items-center gap-2">
          <img src={waiting} alt="" className="w-80" />
          <p>You're not authenticated, Please login first</p>
        </div>
        <Footer className="absolute bottom-0" />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      Challenges
      <Footer />
    </>
  );
}

export default Challenges;
