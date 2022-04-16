import { atom } from "recoil";

export const modalState = atom({
    key: "modalState",
    default: true,
})

export const challengeSelected = atom({
    key: "challengeSelected",
    default: {}
})