import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatText from "./ChatText";
import { db } from "../firebase/FirebaseSetup";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

const ChatScreen = () => {
  const location = useLocation();
  const v1 = location.state?.value1;
  const v2 = location.state?.value2;
  const v3 = location.state?.value3;
  const [prof, setProf] = useState({});
  let c1 = new Set();
  let myObj = {};

  const chatContent = async () => {
    const collRef = collection(db, "messaging", v1, "with");
    const q1 = query(collRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q1, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        c1.add(doc.id);

        myObj[doc.id] = doc.data();
      });
      setProf(myObj);

      // console.log("Current cities in CA: ", cities.join(", "));
    });
  };

  useEffect(() => {
    chatContent();
    // fetchProfile();
  });

  return (
    <>
      <div>
        <div className="card mx-3 my-3" style={{ height: "20%" }}>
          <img
            src={v3}
            className="card-img-top"
            alt="..."
            style={{ objectFit: "cover", height: "100px" }}
          />
          <div className="card-body">
            <h5 className="card-title"> {v2} </h5>
          </div>
        </div>

        <ChatText msgID={v1} username={v2} imageURL={v3} />

        {/* <h1> { prof[c1[0].text]} </h1> */}

        {Object.entries(prof).map(([key, value]) => (
          <li key={key}>
            {prof[key].userId === localStorage.getItem("uid") && (
              <div
                className="d-flex align-items-end flex-column mb-3"
                style={{ height: "200px;" }}
              >
                <div className="card text-bg-info mb-3 mx-5">
                  <div className="card-header"> {prof[key].date} </div>
                  <div className="card-body">
                    <h5 className="card-title">{prof[key].username}</h5>
                    <p className="card-text"> {prof[key].text} </p>
                  </div>
                </div>
              </div>
            )}

            {prof[key].userId !== localStorage.getItem("uid") && (
              <div
                className="d-flex align-items-start flex-column mb-3"
                style={{ height: "200px;" }}
              >
                <div className="card text-bg-warning mb-3 mx-5">
                  <div className="card-header"> {prof[key].date} </div>
                  <div className="card-body">
                    <h5 className="card-title">{prof[key].username}</h5>
                    <p className="card-text"> {prof[key].text} </p>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </div>
    </>
  );
};

export default ChatScreen;
