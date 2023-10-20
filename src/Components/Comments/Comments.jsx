import React, { useState, useEffect } from 'react';
import './Comments.css';
import { auth, db } from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'

const Comments = ({ articleId }) => {
  // get user data
  const [user] = useAuthState(auth);

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // get reference to comments collection
    // const commentsRef = collection(db, 'Comments');
    // // get the comments
    // getDocs(commentsRef)
    //   .then((res) => {
    //     // convert to array
    //     const comments = res.docs.map((item) => ({
    //       ...item.data(),
    //       id: item.id,
    //     }));

    //     // console.log(comments);
    //     setComments(comments);
    //   })
    //   .catch((err) => console.log(err));

    // get reference to comments collection
    const commentsRef = collection(db, 'Comments');

    // filter to show only comments for this article
    const q = query(commentsRef, where('articleId', '==', articleId));

    onSnapshot(q, (snapshot) => {
      // convert to array
      const comments = snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));

      setComments(comments);
    });
  }, []);

  const addNewComment = (e) => {
    e.preventDefault();
    // need to make a new document in Comments collection
    // include the newComment text, the articleId, and the User who made the comment
    // create a reference to comments collection
    // will create a collection if doesn't exist
    const commentsRef = collection(db, 'Comments');
    // adding a document with this articleId and user
    addDoc(commentsRef, {
      articleId: articleId,
      userId: user?.uid,
      content: newComment,
      username: user?.displayName,
    })
      .then((res) => {
        // giving feedback to user for adding a comment
        toast('Comment added!', {
          type: 'success',
          autoClose: 1500,
        });
        // reset the input to be empty
        setNewComment('');
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (id) => {
    // get the particular document
    deleteDoc(doc(db, 'Comments', id))
      .then((res) => {
        // giving feedback to user for deleting their comment
        toast('Comment deleted', {
          type: 'success',
          autoClose: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="comments-container">
        {comments.map((item) => (
          <div className="comment" key={item.id}>
            <p>
              <span>{item.username}</span>
              {item.content}
            </p>
            {
              // each comment has userId
              // compare the userId to see if I can delete
              user?.uid === item?.userId && (
                <button onClick={() => deleteComment(item.id)}>Delete</button>
              )
            }
          </div>
        ))}
      </div>
      {user ? (
        <form onSubmit={addNewComment}>
          <input
            type="text"
            placeholder="Add comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <button type="submit">Add Comment</button>
        </form>
      ) : (
        <p>Please login to comment</p>
      )}
    </div>
  );
};

export default Comments;