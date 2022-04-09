import React, { useState } from "react";
import Filter from "./Filter";

const typeData = [
  { id: 1, name: "All" },
  { id: 2, name: "Education" },
  { id: 3, name: "Recreational" },
  { id: 4, name: "Social" },
  { id: 5, name: "DIY" },
  { id: 6, name: "Charity" },
  { id: 7, name: "Cooking" },
  { id: 8, name: "Relaxation" },
  { id: 9, name: "Music" },
  { id: 10, name: "Busywork" },
];

const priceData = [
  { id: 1, name: "All" },
  { id: 2, name: "Free" },
  { id: 3, name: "Low" },
  { id: 4, name: "Medium" },
  { id: 5, name: "High" },
];

const participantData = [
  { id: 1, name: "All" },
  { id: 2, name: "Solo" },
  { id: 3, name: "Duo" },
  { id: 4, name: "Group" },
];

const accessData = [
  { id: 1, name: "All" },
  { id: 2, name: "Easy" },
  { id: 3, name: "Medium" },
  { id: 4, name: "Hard" },
];

function FilterContainer() {
  const [selectedType, setSelectedType] = useState(typeData[0]);
  const [selectedPrice, setSelectedPrice] = useState(priceData[0]);
  const [selectedParticipant, setSelectedParticipant] = useState(participantData[0]);
  const [selectedAccess, setSelectedAccess] = useState(accessData[0]);

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
