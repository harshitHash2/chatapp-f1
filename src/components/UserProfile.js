import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/FirebaseSetup";

const UserProfile = () => {
  const [prof, setProf] = useState({});

  const fetchProfile = async () => {
    // Fetching user profile
    const docRef = doc(db, "users", localStorage.getItem("uid"));
    const docSnap = await getDoc(docRef);
    setProf(docSnap.data());
    console.log(docSnap.data());
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
            src={prof.imageURL}
          ></img>
        </div>
      </div>
      <div
        className="container"
        style={{ width: "150rem", textAlign: "center" }}
      >
        <div className="container my-3" style={{ width: "40%" }}>
          <div className="card mb-3">
            <div className="card-body">
              <h5> Username: {prof.username} </h5>
              <p> Name: {prof.name} </p>
              <p> Email: {prof.email} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
