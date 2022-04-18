import { useAuth0 } from "@auth0/auth0-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FinishedChallengePost from "../components/FinishedChallengePost";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { firestoreDb } from "../firebase";

function Explores() {
  const { user } = useAuth0();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDb, "finished-challenges"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow my-6 mx-16">
        <h2 className="font-semibold text-4xl">See What Others Done! 🎉</h2>
        <div className="grid grid-cols-3 gap-x-3 gap-y-6 gap mt-6">
          {posts.map((post) => (
            <FinishedChallengePost
              key={post.id}
              id={post.id}
              type={post.data().type}
              username={post.data().username}
              userId={post.data().userId}
              profileImg={post.data().profileImg}
              image={post.data().image}
              participant={post.data().participant}
              likes={post.data().likes}
              activity={post.data().activity}
              timestamp={post.data().timestamp}
              caption={post.data().caption}
              userNow={user?.sub.substring(user.sub.indexOf("|") + 1)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explores;
