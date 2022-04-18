import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import waiting from "../assets/waiting.svg";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import ChallengesCard from "../components/ChallengesCard";
import emptyImage1 from "../assets/empty1.svg";
import emptyImage2 from "../assets/empty2.svg";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import FinishedChallengePost from "../components/FinishedChallengePost";

function Challenges() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [finishedChallenges, setFinishedChallenges] = useState([]);
  const userId = user?.sub.substring(user.sub.indexOf("|") + 1);

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestoreDb, "challenges"),
          where("userId", "==", userId)
        ),
        (snapshot) => {
          setChallenges(snapshot.docs);
        }
      );
      setLoading(false);
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestoreDb, "finished-challenges"),
          where("userId", "==", userId)
        ),
        (snapshot) => {
          setFinishedChallenges(snapshot.docs);
        }
      );
      setLoading(false);
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
    <div className="flex flex-col min-h-screen">
      <Navbar className="flex-grow-0" />
      <Modal user={user} id={user.sub.substring(user.sub.indexOf("|") + 1)} />
      <div className="mx-28 my-10 flex-grow">
        <Tab.Group>
          <Tab.List className="flex gap-3 border-b-[1px] border-gray-600">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "text-base font-semibold px-5 py-2 bg-[#FFC300] rounded-t-lg  transition-all ease-out duration-500"
                      : "text-base opacity-70"
                  }
                >
                  My Challenges
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "text-base font-semibold px-5 py-2 bg-[#FFC300] rounded-t-lg  transition-all ease-out duration-500"
                      : "text-base opacity-70"
                  }
                >
                  Finished Challenges
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {loading && <div>Loading...</div>}
              {challenges.length === 0 && !loading && (
                <div className="flex justify-center gap-4 flex-col items-center my-3">
                  <img src={emptyImage1} alt="" />
                  <div>
                    <h5 className="text-2xl font-medium text-center">
                      All your challenges is completed
                    </h5>
                    <p className="opacity-70 text-center">
                      Spice up your day, lets start a new challenges
                    </p>
                  </div>
                  <button
                    className="text-lg font-medium bg-[#ffc300] py-2 px-8 mt-5 rounded-sm hover:bg-yellow-500"
                    onClick={() => navigate("/")}
                  >
                    Randomize
                  </button>
                </div>
              )}
              {challenges.map((challenge) => (
                <ChallengesCard
                  key={challenge.id}
                  id={challenge.id}
                  type={challenge.data().type}
                  price={challenge.data().price}
                  participant={challenge.data().participants}
                  access={challenge.data().access}
                  activity={challenge.data().activity}
                />
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {loading && <div>Loading...</div>}
              {finishedChallenges.length === 0 && !loading && (
                <div className="flex justify-center gap-4 flex-col items-center my-3">
                  <img src={emptyImage2} alt="" />
                  <div>
                    <h5 className="text-2xl font-medium text-center">
                      Finished Your Challenges and Share The Moments
                    </h5>
                    <p className="opacity-70 text-center">
                      There's no Finished Challenges
                    </p>
                  </div>
                  <button
                    className="text-lg font-medium bg-[#ffc300] py-2 px-8 mt-5 rounded-sm hover:bg-yellow-500"
                    onClick={() => navigate("/")}
                  >
                    Randomize
                  </button>
                </div>
              )}
              <div className="grid grid-cols-3 gap-x-3 gap-y-6 gap mt-6 ">
                {finishedChallenges.map((finishChallenge) => (
                  <FinishedChallengePost
                    key={finishChallenge.id}
                    id={finishChallenge.id}
                    type={finishChallenge.data().type}
                    username={finishChallenge.data().username}
                    userId={finishChallenge.data().userId}
                    profileImg={finishChallenge.data().profileImg}
                    image={finishChallenge.data().image}
                    participant={finishChallenge.data().participant}
                    likes={finishChallenge.data().likes}
                    activity={finishChallenge.data().activity}
                    timestamp={finishChallenge.data().timestamp}
                    caption={finishChallenge.data().caption}
                    userNow={userId}
                  />
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Footer className="flex-grow-0" />
    </div>
  );
}

export default Challenges;
