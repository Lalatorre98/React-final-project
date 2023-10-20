import React, { useState, useEffect } from "react";
import "./Likes.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth, db } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Likes = ({ articleId }) => {
  // get user data
  const [user] = useAuthState(auth);

  //   console.log("ArticleId", articleId);
  //   console.log("User", user)

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  //   need to know if user has liked this article before, if they did so that we show the liked heart icon
  useEffect(() => {
    // did this user like this article?
    // need the collection
    const likesRef = collection(db, "Likes");
    // if user is logged in
    if (user) {
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      //   look for matching document
      getDocs(q, likesRef)
        .then((res) => {
          if (res.size > 0) {
            setIsLiked(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    // now we find out like count
    // make a query to count the likes
    const likesRef = collection(db, "Likes");

    const q2 = query(likesRef, where("articleId", "==", articleId));

    // look for matching documents
    getDocs(q2, likesRef)
      .then((res) => {
        setLikesCount(res.size);
      })
      .catch((err) => console.log(err));
  }, [isLiked]);

  //   need to add a like for this user to this article if you click the empty heart, remove if click again
  // will need another collection that stores the userId and articleId which is the Like collection
  const handleLike = (e) => {
    // make sure user is logged in
    if (user) {
      // create reference to likes collection
      // will create collection if does not exist
      const likesRef = collection(db, "Likes");
      // adding a document with this articleId and userId
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then((res) => {
          // want to show that it is liked by showing the full heart icon
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUnlike = (e) => {
    // make sure the user is logged in
    if (user) {
      // need to find document with this userId and articleId
      // to get its document id
      const likesRef = collection(db, "Likes");

      // set up a query to find the id of the document to delete
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      //   get match
      getDocs(q, likesRef)
        .then((res) => {
          //   console.log(res.size);
          //   console.log(res.docs[0]);
          const likesId = res.docs[0].id;
          // console.log(likesId)

          deleteDoc(doc(db, "Likes", likesId))
            .then((res) => {
              // change icon to unlike heart icon
              setIsLiked(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="like-icon">
        {isLiked ? (
          <FaHeart onClick={handleUnlike} />
        ) : (
          <FaRegHeart onClick={handleLike} />
        )}
        <span>{likesCount}</span>
      </div>
    </div>
  );
};

export default Likes