import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import FilterContainer from "../components/FilterContainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import transformAttribute from "../helpers/transformAttribute";
import {
  accessState,
  participantState,
  priceState,
  typeState,
} from "../atoms/filterAtom";
import { firestoreDb } from "../firebase";

function Home() {
  const { isAuthenticated, user } = useAuth0();
  const [randomAct, setRandomAct] = useState();
  const [loading, setLoading] = useState(true);
  const typeValue = useRecoilValue(typeState);
  const priceValue = useRecoilValue(priceState);
  const participantValue = useRecoilValue(participantState);
  const accessValue = useRecoilValue(accessState);

  const addChallengesToast = () => (
    <div>
      Challenges Added{" "}
      <a
        href="/challenges"
        className="text-[#FFC300] font-medium hover:font-semibold underline"
      >
        Here
      </a>
    </div>
  );

  useEffect(() => {
    getRandomActivity();
  }, []);

  const addChallenges = async () => {
    setLoading(true);
    if (!isAuthenticated) {
      toast.warn('To save challenges you must logged in first')
    } else {
      const userId = user.sub.substring(user.sub.indexOf("|") + 1);
      await addDoc(collection(firestoreDb, "challenges"),{
        userId: userId,
        activity: randomAct.activity,
        type: randomAct.type,
        price: randomAct.price,
        participants: randomAct.participants,
        access: randomAct.accessibility,
        timestamp: serverTimestamp(),
      });
      toast.success(addChallengesToast);
    }
    setLoading(false);
  };

  const getRandomActivity = () => {
    setLoading(true);
    axios
      .get("http://www.boredapi.com/api/activity", {
        params: {
          type: typeValue.value,
          minprice: priceValue.value[0],
          maxprice: priceValue.value[1],
          participants: participantValue.value,
          minaccessibility: accessValue.value[0],
          maxaccessibility: accessValue.value[1],
        },
      })
      .then(function (response) {
        if(response.data.error){
          toast.error(response.data.error)
        }else{
          const transformedData = transformAttribute(response.data);
          setRandomAct(transformedData);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <FilterContainer />
      {!randomAct && (
        <h1 className="mx-16 mb-12 text-5xl font-semibold">Loading...</h1>
      )}
      <div className="mx-16 mb-12">
        <h1 className="text-5xl w-5/6 font-semibold leading-tight">
          {randomAct?.activity}
        </h1>
        <div className="flex items-center gap-6 mt-6">
          <p className="opacity-80 text-lg">Type: {randomAct?.type}</p>
          <p className="opacity-80 text-lg">Price: {randomAct?.price}</p>
          <p className="opacity-80 text-lg">
            Participants: {randomAct?.participants}
          </p>
          <p className="opacity-80 text-lg">
            Accessibility: {randomAct?.accessibility}
          </p>
        </div>
      </div>
      <div className="flex items-center mx-16 gap-4">
        <button
          className={`text-xl font-medium py-4 px-8 border-2 border-[#FFC300] rounded-lg bg-white hover:bg-yellow-100 ${loading && "opacity-60"} `}
          onClick={addChallenges}
          disabled={loading}
        >
          Accept Challenge
        </button>
        <button
          className={`text-white p-4 bg-[#FFC300] rounded-lg hover:bg-yellow-500 cursor-pointer ${loading && "opacity-60"} `}
          onClick={getRandomActivity}
          disabled={loading}
        >
          <Icon icon="ic:round-restart-alt" width="36" />
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
