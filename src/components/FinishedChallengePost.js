import React, { lazy } from "react";
import { Icon } from "@iconify/react";
import Moment from "react-moment";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { Menu } from "@headlessui/react";
import { toast } from "react-toastify";

function FinishedChallengePost({
  type,
  id,
  username,
  participant,
  profileImg,
  timestamp,
  activity,
  image,
  caption,
  userId,
  likes,
  userNow,
}) {
  const docRef = doc(firestoreDb, "finished-challenges", id);

  const addLikeHandler = async () => {
    await updateDoc(docRef, {
      likes: increment(1),
    });
  };

  const deletePostHandler = async () =>{
    await deleteDoc(docRef)
    toast.success('Success Delete Challenges Post')
  }

  return (
    <div className="px-3 py-4 bg-white post-shadow rounded-md">
      {/* Top */}
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <img src={profileImg} className="w-8 rounded-full" alt="profileImg" />
          <p className="font-medium text-sm">{username}</p>
        </div>
          <Menu>
            <Menu.Button>
              <Icon
                icon="akar-icons:more-horizontal"
                width="22"
                className="cursor-pointer"
              />
            </Menu.Button>
            <Menu.Items className="flex absolute flex-col bg-white right-0 top-8 p-2 rounded-md border-[1px] border-gray-500">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active && "text-red-500 cursor-pointer"
                    } p-1 text-sm flex items-end font-medium  gap-2`}
                    onClick={()=>toast.info("Success Report")}
                  >
                    <Icon icon="clarity:warning-line" width="24" />
                    <p>Report</p>
                  </div>
                )}
              </Menu.Item>
              {
                  userNow === userId && (
                    <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "text-red-500 cursor-pointer"
                        } p-1 text-sm flex items-end font-medium  gap-2`}
                        onClick={deletePostHandler}
                      >
                        <Icon icon="clarity:trash-line" width="24" />
                        <p>Delete</p>
                      </div>
                    )}
                  </Menu.Item>
                  )
              }
            </Menu.Items>
          </Menu>
      </div>

      {/* Middle */}
      <img
        src={image}
        className="object-cover h-[240px] w-[360px] rounded-lg my-3"
        alt="challengesimg"
        loading={lazy}
      />

      {/* Bottom 1 */}
      <p className="text-[15px]">{caption}</p>
      <div className="my-2 py-1 border-t-[1px] border-t-gray-300">
        <h5 className="font-medium truncate">{activity}</h5>
        <p className="text-sm text-gray-500">
          {type} - {participant} People
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon
            icon="ant-design:heart-filled"
            width="22"
            className={`cursor-pointer hover:scale-110 ${
              likes > 0 ? "text-red-500" : "text-gray-400"
            }`}
            onClick={addLikeHandler}
          />
          {likes > 0 && <p className="text-gray-600">{likes}</p>}
        </div>
        <Moment fromNow className="text-sm">
          {timestamp.toDate()}
        </Moment>
      </div>
    </div>
  );
}

export default FinishedChallengePost;
