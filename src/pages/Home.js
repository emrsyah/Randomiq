import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterContainer from "../components/FilterContainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import transformAttribute from "../helpers/transformAttribute";

function Home() {
  const [randomAct, setRandomAct] = useState();
  useEffect(() => {
    // console.log('mulai fetch')
    getRandomActivity();
  }, []);

  const getRandomActivity = () => {
    axios
      .get("http://www.boredapi.com/api/activity/")
      .then(function (response) {
        // console.log('selesai fetch')
        const transformedData = transformAttribute(response.data)
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
        <h1 className="text-5xl w-5/6 font-semibold leading-tight">{randomAct?.activity}</h1>
        <div className="flex items-center gap-6 mt-6">
          <p className="opacity-80 text-lg">Type: {randomAct?.type}</p>
          <p className="opacity-80 text-lg">Price: {randomAct?.price}</p>
          <p className="opacity-80 text-lg">Participants: {randomAct?.participants}</p>
          <p className="opacity-80 text-lg">Accessibility: {randomAct?.accessibility}</p>
        </div>
      </div>
      <div>
        <button>Accept Challenge</button>
        <button></button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
