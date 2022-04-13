import { atom } from "recoil";

export const typeData = [
  { id: 1, name: "All", value: null },
  { id: 2, name: "Education", value: "education" },
  { id: 3, name: "Recreational", value: "recreational" },
  { id: 4, name: "Social", value: "social" },
  { id: 5, name: "DIY", value: "diy" },
  { id: 6, name: "Charity", value: "charity" },
  { id: 7, name: "Cooking", value: "cooking" },
  { id: 8, name: "Relaxation", value: "relaxation" },
  { id: 9, name: "Music", value: "music" },
  { id: 10, name: "Busywork", value: "busywork" },
];

export const priceData = [
  { id: 1, name: "All", value: [null, null] },
  { id: 2, name: "Free", value: [0, 0] },
  { id: 3, name: "Low", value: [0.1, 0.3] },
  { id: 4, name: "Medium", value: [0.4, 0.7] },
  { id: 5, name: "High", value: [0.8, 1] },
];

export const participantData = [
  { id: 1, name: "All", value: null },
  { id: 2, name: "Solo", value: 1 },
  { id: 3, name: "Duo", value: 2 },
  { id: 4, name: "Group", value: Math.floor(Math.random() * (5 - 3 + 1) + 3) },
];

export const accessData = [
  { id: 1, name: "All", value: [null, null] },
  { id: 2, name: "Easy", value: [0.1, 0.3] },
  { id: 3, name: "Medium", value: [0.4, 0.7] },
  { id: 4, name: "Hard", value: [0.8, 1] },
];

export const typeState = atom({
  key: "atomType",
  default: typeData[0],
});
export const priceState = atom({
  key: "atomPrice",
  default: priceData[0],
});
export const participantState = atom({
  key: "atomParticipant",
  default: participantData[0],
});
export const accessState = atom({
  key: "atomAccess",
  default: accessData[0],
});
