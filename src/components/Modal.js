import React from "react";
import { Dialog } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { Icon } from "@iconify/react";
import { modalState } from "../atoms/modalAtom";

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="z-10 w-full h-full m-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
        <div className="centered bg-white p-5 rounded-md w-[540px]">
          <div className="flex justify-between mb-4">
            <Dialog.Title>
              <h5 className="font-medium">Play Basketball with your friends</h5>
              <p className="text-sm">Social - 5 People</p>
            </Dialog.Title>
            <Icon
              icon="akar-icons:cross"
              className="opacity-70 hover:opacity-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <p>Picture</p>
          <input type="file" name="" id="" />
        </div>
      </Dialog>
    </div>
  );
}

export default Modal;
