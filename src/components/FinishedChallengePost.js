import React from "react";
import { Icon } from "@iconify/react";
import Moment from "react-moment";
import { doc, increment, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase";

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
  const addLikeHandler = async () => {
    const docRef = doc(firestoreDb, 'finished-challenges', id)
    await updateDoc(docRef,{
        likes: increment(1)
    })
  };
  return (
    <div className="px-3 py-4 bg-white post-shadow rounded-md">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={profileImg} className="w-8 rounded-full" alt="profileImg" />
          <p className="font-medium">{username}</p>
        </div>
        {userNow === userId && (
          <Icon
            icon="akar-icons:more-horizontal"
            width="22"
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Middle */}
      <img
        src={image}
        className="object-cover h-[240px] w-[360px] rounded-lg my-3"
        alt="challengesimg"
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
            className={`cursor-pointer hover:scale-105 ${likes > 0 ? "text-red-500" : "text-gray-400"}`}
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
