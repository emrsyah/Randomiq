import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import FilterContainer from "../components/FilterContainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import transformAttribute from "../helpers/transformAttribute";
import { useRecoilValue } from "recoil";
import { accessState, participantState, priceState, typeState } from "../atoms/filterAtom";

function Home() {
  const [randomAct, setRandomAct] = useState();
  // TODO nanti ada loading pake modal, paling waktu loading sekarang mah disable button aja
  // const [loading, setLoading] = useState(true)
  const typeValue = useRecoilValue(typeState)
  const priceValue = useRecoilValue(priceState)
  const participantValue = useRecoilValue(participantState)
  const accessValue = useRecoilValue(accessState)
  useEffect(() => {
    getRandomActivity();
  }, []);

  const getRandomActivity = () => {
    axios
      .get("http://www.boredapi.com/api/activity",{
        params:{
          type: typeValue.value,
          minprice: priceValue.value[0],
          maxprice: priceValue.value[1],
          participants: participantValue.value,
          minaccessibility: accessValue.value[0],
          maxaccessibility: accessValue.value[1]
        }
      })
      .then(function (response) {
        const transformedData = transformAttribute(response.data);
        setRandomAct(transformedData);
      })
      .catch(function (error) {
        console.log(error);
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
        <button className="text-xl font-medium py-4 px-8 border-2 border-[#FFC300] rounded-lg bg-white hover:bg-yellow-100">
          Accept Challenge
        </button>
        <div className="text-white p-4 bg-[#FFC300] rounded-lg hover:bg-yellow-500 cursor-pointer" onClick={getRandomActivity}>
          <Icon icon="ic:round-restart-alt" width="36" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
