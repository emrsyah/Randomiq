import React from "react";
import { Icon } from "@iconify/react";
import { deleteDoc, doc } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { useSetRecoilState } from "recoil";
import { challengeSelectedState, modalState } from "../atoms/modalAtom";
import { toast } from "react-toastify";

function ChallengesCard({ type, id, price, participant, access, activity }) {
  const setModal = useSetRecoilState(modalState);
  const setSelectedChallenge = useSetRecoilState(challengeSelectedState);

  // TODO Add Toast Notification after delete is success
  const deleteChallengesHandler = async () => {
    await deleteDoc(doc(firestoreDb, "challenges", id));
    toast.info("Challenges Deleted");
  };

  const finishChallengesHandler = () => {
    setSelectedChallenge({
      activity: activity,
      type: type,
      participant: participant,
      id: id,
    });
    setModal(true);
  };

  return (
    <div className="py-4 mt-1 flex justify-between p-atas border-b-[1px] border-b-gray-400">
      <div>
        <h5 className="font-medium">{activity}</h5>
        <p className="opacity-75 text-sm mt-1">
          {type} - {price} price - {participant} people - {access} accessibility
        </p>
      </div>
      <div className="flex gap-5  cursor-pointer">
        <button
          className="p-1 b-bawah b-ijo max-h-max"
          onClick={finishChallengesHandler}
        >
          <Icon icon="bi:check-square" width="24" />
        </button>
        <button
          className="p-1 b-bawah b-merah max-h-max"
          onClick={deleteChallengesHandler}
        >
          <Icon icon="fa:trash-o" width="24" />
        </button>
      </div>
    </div>
  );
}

export default ChallengesCard;
