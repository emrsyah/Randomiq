import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import waiting from "../assets/waiting.svg";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import ChallengesCard from "../components/ChallengesCard";

function Challenges() {
  const { isAuthenticated, user } = useAuth0();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const userId = user.sub.substring(user.sub.indexOf("|") + 1);
      const unsubscribe = onSnapshot(
        query(
          collection(firestoreDb, "challenges"),
          where("userId", "==", userId)
        ),
        (snapshot) => {
          setChallenges(snapshot.docs);
        }
      );
      return unsubscribe;
    }
  }, []);

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
    <div>
      <Navbar />
      {challenges.map((challenge) => (
        <ChallengesCard
          key={challenge.id}
          id={challenge.id}
          type={challenge.data().type}
          price={challenge.data().price}
          participant={challenge.data().participants}
          access={challenge.data().access}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Challenges;
