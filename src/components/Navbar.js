import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebase/AuthService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let history = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();

    try {
      const user = await logout();
      //   console.log(user.user.uid);
      localStorage.setItem("uid", null);
      console.log(localStorage.removeItem("uid"));
      history("/");

      // alert('Logged in successfully!');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Fi ~ Grad
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("uid") !== null && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              )}
              {localStorage.getItem("uid") !== null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/allchats">
                    All Chats
                  </Link>
                </li>
              )}
              {localStorage.getItem("uid") !== null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              )}
            </ul>

            {localStorage.getItem("uid") !== null && (
              <Link className="btn btn-primary" to="/search">
                Search
              </Link>
            )}

            {localStorage.getItem("uid") === null && (
              <Link className="btn btn-primary mx-2" to="/login">
                LogIn
              </Link>
            )}
            {localStorage.getItem("uid") === null && (
              <Link className="btn btn-primary mx-2" to="/signup">
                SignUp
              </Link>
            )}

            {localStorage.getItem("uid") !== null && (
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={handleLogOut}
              >
                LogOut
              </button>
            )}

            {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
