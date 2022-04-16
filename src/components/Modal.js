import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icon } from "@iconify/react";
import { challengeSelectedState, modalState } from "../atoms/modalAtom";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestoreDb, storage } from "../firebase";
import {ref, uploadString} from 'firebase/storage'
import { setFirestoreStorage } from "../helpers/firebaseStorage";

function Modal({user}) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const selectedChallenge = useRecoilValue(challengeSelectedState)
  const [selectedImg, setSelectedImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null);
  const captionRef = useRef(null);

  const postChallengeHandler = async (ev) =>{
      ev.preventDefault();
      if(loading) return
      setLoading(true)
      // * Upload Doc First to get unique id for image name
      const docRef = await addDoc(collection(firestoreDb, 'finished-challenges'),{
        username: user.nickname,
        caption: captionRef.current.value,
        profileImg: user.picture,
        timestamp: serverTimestamp(),
        activity: selectedChallenge.activity,
        type: selectedChallenge.type,
        participant: selectedChallenge.participant,
      });
      const imgUrl = await setFirestoreStorage(selectedImg, docRef.id)
      await updateDoc(doc(firestoreDb, 'finished-challenges', docRef.id),{
        image: imgUrl
      })
      setIsOpen(false)
      setLoading(false)
      setSelectedImg(false)
  }

  const modalCloseHandler = () =>{
    setIsOpen(false)
    setSelectedImg(null)
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={modalCloseHandler}
        className="z-10 w-full h-full m-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="centered bg-white p-5 rounded-md w-[540px]">
          <div className="flex justify-between mb-4 border-b-[1px] border-b-gray-300 pb-1">
            <div>
              <h5 className="font-medium">{selectedChallenge.activity}</h5>
              <p className="text-sm">{selectedChallenge.type} - {selectedChallenge.participant} People</p>
            </div>
            <Icon
              icon="akar-icons:cross"
              className="opacity-70 hover:opacity-100 cursor-pointer"
              onClick={modalCloseHandler}
            />
          </div>
          <form onSubmit={postChallengeHandler}>
            <p>
              Your Picture On This Challenges
              <span className="text-red-600">*</span>
            </p>
            <input type="file" name="" id="" ref={fileInputRef} required hidden onChange={(ev)=>setSelectedImg(ev.target.files[0])} accept="image/*" />
            <div
              onClick={() => fileInputRef.current.click()}
              className="cursor-pointer w-full mt-1 bg-yellow-200 hover:bg-yellow-300  border-[#ffc300] border-2 text-center rounded-md p-1 text-yellow-700 text-sm"
            >
              {selectedImg? selectedImg.name : "Select Image"}
            </div>
            <p className="mt-5">
              How It Goes<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              name=""
              id=""
              className="w-full p-3 mt-1 border-[1px] border-gray-300 rounded-sm focus:outline-none focus:border-[#FFC300] focus:border-[1.5px]"
              placeholder="Tell us how it goes (max 50 char)"
              maxLength={50}
              required
              ref={captionRef}
            />
            <button type="submit" className=" mt-8 py-2 px-4 bg-[#ffc300] hover:bg-yellow-500 rounded-md font-medium">
                Finish and Post
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Modal;
