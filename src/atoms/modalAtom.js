import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const challengeSelectedState = atom({
  key: "challengeSelectedState",
  default: {},
});
