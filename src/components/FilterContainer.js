import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { accessData, accessState, participantData, participantState, priceData, priceState, typeData, typeState } from "../atoms/filterAtom";
import Filter from "./Filter";


// TODO Tambahin value di tiap datanya kek param buat fetch api nya nanti


function FilterContainer() {
  const [selectedType, setSelectedType] = useRecoilState(typeState);
  const [selectedPrice, setSelectedPrice] = useRecoilState(priceState);
  const [selectedParticipant, setSelectedParticipant] = useRecoilState(participantState);
  const [selectedAccess, setSelectedAccess] = useRecoilState(accessState);

  const clearFilter = ()=>{
    setSelectedType(typeData[0])
    setSelectedPrice(priceData[0])
    setSelectedParticipant(participantData[0])
    setSelectedAccess(accessData[0])
  }
  return (
    <div className="flex gap-5 items-center mx-16 my-12">
      <Filter selected={selectedType} data={typeData} setter={setSelectedType} name="Type" />
      <Filter selected={selectedPrice} data={priceData} setter={setSelectedPrice} name="Price" />
      <Filter selected={selectedParticipant} data={participantData} setter={setSelectedParticipant} name="Participant" />
      <Filter selected={selectedAccess} data={accessData} setter={setSelectedAccess} name="Accessibility" />
      <p className="font-semibold opacity-70 hover:opacity-100 cursor-pointer" onClick={clearFilter}>Clear</p>
    </div>
  );
}

export default FilterContainer;
