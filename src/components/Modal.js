import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icon } from "@iconify/react";
import { challengeSelectedState, modalState } from "../atoms/modalAtom";

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const selectedChallenge = useRecoilValue(challengeSelectedState)
  const fileInputRef = useRef(null);
  const captionRef = useRef(null);
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="z-10 w-full h-full m-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="centered bg-white p-5 rounded-md w-[540px]">
          <div className="flex justify-between mb-4 border-b-[1px] border-b-gray-300 pb-1">
            <Dialog.Title>
              <h5 className="font-medium">{selectedChallenge.activity}</h5>
              <p className="text-sm">{selectedChallenge.type} - {selectedChallenge.participant} People</p>
            </Dialog.Title>
            <Icon
              icon="akar-icons:cross"
              className="opacity-70 hover:opacity-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <form>
            <p>
              Your Picture On This Challenges
              <span className="text-red-600">*</span>
            </p>
            <input type="file" name="" id="" ref={fileInputRef} hidden accept="image/*" />
            <div
              onClick={() => fileInputRef.current.click()}
              className="cursor-pointer w-full mt-1 bg-yellow-200 hover:font-medium border-[#ffc300] border-2 text-center rounded-md p-1 text-yellow-700 text-sm"
            >
              Select Image
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
            />
            <button type="submit" className="mt-8 py-2 px-4 bg-[#ffc300] hover:bg-yellow-500 rounded-md font-medium">
                Finish and Post
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Modal;
