import React, { useEffect, useState } from "react";

// import { SearchModel, addToSetUnique } from "../models/sp";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseSetup";
import { Link } from "react-router-dom";

const hyp = new Set();
const Search = () => {
  var sresults = new Set();
  // const [hope, setHope] = useState(true);
  const [load, setLoad] = useState([]);

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      sresults = new Set();
      setLoad([]);

      return;
    }

    sresults = new Set();

    for (let num of hyp) {
      if (num.toLowerCase().includes(e.target.value.toLowerCase())) {
        // Add the item to the search results list

        sresults.add(num);
      }
    }
    setLoad(Array.from(sresults.values()));
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      hyp.add(doc.data()["username"]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <SearchBar/> */}
      <div className="container ">
        <div
          className="card my-4"
          style={{ borderRadius: "70px", height: "3rem" }}
        >
          <div
            className="container"
            style={{ height: "3rem", paddingTop: "8px" }}
          >
            <i className="bi bi-search mg-3"></i>
            <input
              type="text"
              className="pp1 mx-3"
              onChange={handleChange}
              id="exampleFormControlInput1"
              placeholder="Search..."
              style={{ border: "none", outline: "none", width: "300px" }}
            />
          </div>
        </div>
      </div>

      {load.map((value) => (
        <div className="container ">
          <div
            className="card"
            style={{ borderRadius: "10px", height: "3rem" }}
          >
            <div
              className="container"
              style={{ height: "3rem", paddingTop: "8px" }}
            >
              <Link
                to="/searchuser"
                state={{ value: value }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <h2> {value} </h2>{" "}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Search;
