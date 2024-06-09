import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../firebase/AuthService";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/FirebaseSetup";

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

const Signup = () => {
  const fileInputRef = useRef(null);
  let history = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      credentials.name === "" ||
      credentials.username === "" ||
      credentials.password === "" ||
      credentials.email === "" ||
      image === null
    ) {
      alert("Enter valid credentials");
      return;
    }

    try {
      //SignUp Process
      const user = await signUp(credentials.email, credentials.password);
      console.log(user.user.uid);
      localStorage.setItem("uid", user.user.uid);

      // Photo processs
      const storageRef = ref(
        storage,
        `images/${localStorage.getItem("uid")}.jpg`
      );

      await uploadBytes(storageRef, image)
        .then(async (snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          await getDownloadURL(storageRef).then(async (url) => {
            setImageUrl(url);

            // Saving data to fire store
            await setDoc(doc(db, "users", user.user.uid), {
              username: credentials.username,
              email: credentials.email,
              imageURL: url,
              name: credentials.name,
              uid: user.user.uid,
            });
          });
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });

      // Saving data to the firrestore for search
      let u1 = credentials.username;
      let u2 = user.user.uid;

      await setDoc(
        doc(db, "search", "username"),
        {
          [u1]: u2,
        },
        { merge: true }
      );

      history("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    // const response = await fetch("http://localhost:5000/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: credentials.name,
    //     email: credentials.email,
    //     password: credentials.password,
    //   }),
    // });
    // const json = await response.json();
    // console.log(json);

    // // Save the auth token and redirect
    // localStorage.setItem("token", json.authtoken);
    // history("/about");
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header className="masthead">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                {/* <h1 className="mb-5">
                  Fi~Grad Secure Chat Platform. More to do more.
                </h1> */}

                <div className="container " style={{ width: "35rem" }}>
                  <div className="card my-4" style={{ borderRadius: "40px" }}>
                    <div className="card-body">
                      <div className="container">
                        <div className="form-group">
                          <input
                            type="file"
                            id="fileInput"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                            required
                          />
                          <button
                            className="btn btn-outline-info"
                            onClick={handleButtonClick}
                          >
                            Add Photo
                          </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={credentials.name}
                              aria-describedby="emailHelp"
                              onChange={onChange}
                              placeholder="Name"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="username">UserName</label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              name="username"
                              value={credentials.username}
                              aria-describedby="emailHelp"
                              onChange={onChange}
                              placeholder="Username"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={credentials.email}
                              aria-describedby="emailHelp"
                              onChange={onChange}
                              placeholder="E-mail"
                              required
                            />
                          </div>
                          <div className="form-group my-3">
                            <label htmlFor="exampleInputPassword1">
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={credentials.password}
                              onChange={onChange}
                              placeholder="Password"
                              required
                            />
                          </div>

                          <button type="submit" className="btn btn-primary">
                            SignUp
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Signup;
