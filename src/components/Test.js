import React, { useState } from "react";

const Test = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    // e.preventDefault();
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
                <h1 className="mb-5">
                  Fi~Grad Secure Chat Platform. More to do more.
                </h1>

                <form
                  className="form-subscribe"
                  id="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control form-control-lg"
                        onChange={onChange}
                        id="emailAddress"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control form-control-lg"
                        onChange={onChange}
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-primary btn-lg"
                        id="submitButton"
                        type="submit"
                      >
                        LogIn
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Test;
