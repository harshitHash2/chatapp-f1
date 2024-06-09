import React, { useState } from "react";
import { db } from "../firebase/FirebaseSetup";
import { collection, addDoc } from "firebase/firestore";

const ChatText = ({ username, imageURL, msgID }) => {
  // const {username, imageURL}= this.props;
  let [text, setText] = useState("");

  const handleSubmit = async () => {
    if (text === "") {
      return;
    }

    const friendCollectionRef = collection(db, "messaging", msgID, "with");

    await addDoc(friendCollectionRef, {
      text: text,
      createdAt: Date(),
      userId: localStorage.getItem("uid"),
      username: username,
      imageURL: imageURL,
      isRead: false,
      date: Date(),
    });

    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
    <div class="d-flex align-content-start flex-wrap">
      <div className="container " style={{ display: "inline-flex" }}>
        <div
          className="card my-4 flex-grow-1"
          style={{ borderRadius: "70px", height: "3rem", width: '100%' }}
        >
          <div
            className="container"
            style={{ height: "3rem", paddingTop: "8px", width: "90%" }}
          >
            <i className="bi bi-search mg-3"></i>
            <input
              // name='text'
              value={text}
              type="text"
              className="pp1 mx-3"
              onChange={handleChange}
              id="exampleFormControlInput1"
              placeholder="Message"
              style={{ border: "none", outline: "none", width: "100%" }}
            />
          </div>
        </div>
        <span>
          <button type="button" className="btn btn-info" onClick={handleSubmit}>
            Info
          </button>
        </span>
      </div>
      </div>
    </>
  );
};

export default ChatText;
