import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  collection,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/FirebaseSetup";

const SearchUser = () => {
  const location = useLocation();
  const value = location.state?.value;
  const [prof, setProf] = useState({});
  const [friend, setFriend] = useState(false);
  let tuid = "";

  // let prof ={}

  const fetchProfile = async () => {
    // Fetching user profile
    const q = query(collection(db, "users"), where("username", "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setProf(doc.data());
      tuid = doc.data()["uid"];
    });

    // Checking for friendship
    const docRef = doc(db, "friend", localStorage.getItem("uid"), "with", tuid);
    const docSnap = await getDoc(docRef);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    if (docSnap.exists()) {
      setFriend(true);
    }
  };

  // Add a friend
  const addFriend = async () => {
    if (friend) {
      console.log("already a friend");
      return;
    }

    // Setting first person
    const friendCollectionRef = collection(
      db,
      "friend",
      localStorage.getItem("uid"),
      "with",
      prof["uid"],
      "to"
    );

    await addDoc(friendCollectionRef, {
      friendship: "true",
    });
    console.log("Friendship added successfully");

    let msgId = "";
    // Fetch all documents from the subcollection
    const querySnapshot = await getDocs(friendCollectionRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      msgId = doc.id;
    });

    const friendCollectionRef2 = doc(
      db,
      "friend",
      prof["uid"],
      "with",
      localStorage.getItem("uid"),
      "to",
      msgId
    );

    await setDoc(friendCollectionRef2, { friendship: "true" });
    console.log(msgId);

    // Setting messaging for user interface
    const friendCollectionRef3 = collection(db, "messaging", msgId, "with");

    await addDoc(friendCollectionRef3, {
      text: "",
      createdAt: "--",
      userId: "lk",
      username: prof["username"],
      imageURL: "userData[]",
      isRead: true,
      date: Date(),
    });

    // last round friendship
    const friendCollectionRef4 = doc(
      db,
      "friend",
      prof["uid"],
      "with",
      localStorage.getItem("uid")
    );
    await setDoc(friendCollectionRef4, { friendship: "true" });

    const friendCollectionRef5 = doc(
      db,
      "friend",
      localStorage.getItem("uid"),
      "with",
      prof["uid"]
    );
    await setDoc(friendCollectionRef5, { friendship: "true" });

    setFriend(true);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div className="container " style={{ width: "150px" }}>
        <div
          className="card my-4"
          style={{ borderRadius: "100%", height: "150px", width: "150px" }}
        >
          <img
            style={{ borderRadius: "100%", height: "150px", width: "150px" }}
            src={prof["imageURL"]}
          ></img>
        </div>
      </div>
      <div
        className="container"
        style={{ width: "150rem", textAlign: "center" }}
      >
        {friend && (
          <button type="button" className="btn btn-warning mx-1" disabled>
            Add Friend
          </button>
        )}
        {!friend && (
          <button
            type="button"
            className="btn btn-warning mx-1"
            onClick={addFriend}
          >
            Add Friend
          </button>
        )}
        {friend && (
          <button type="button" className="btn btn-warning mx-1">
            Message
          </button>
        )}

        {!friend && (
          <button type="button" className="btn btn-warning mx-1" disabled>
            Message
          </button>
        )}

        <div className="container my-3" style={{ width: "40%" }}>
          <div className="card mb-3">
            <div className="card-body">
              <h5> Username: {prof["username"]} </h5>
              <p> Name: {prof["name"]} </p>
              <p> Email: {prof["email"]} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
