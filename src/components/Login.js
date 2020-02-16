import React, { useState } from "react";
import axios from "axios";
import Home from "./Home";

export const customerContext = React.createContext();

const Login = () => {
  const [account, setAccount] = useState(0);
  const [pin, setPin] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [accountData, setAccountData] = useState({});

  const authHandler = (dbAccount, dbPin) => {
    if (dbAccount === Number(account) && dbPin === Number(pin)) {
      setIsAuthenticated(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get(`https://atm-backend-server.herokuapp.com/customer/${account}`)
      .then(response => {
        setAccountData(response.data[0]);
        const { account_number: dbAccount, pin: dbPin } = response.data[0];
        console.log("Submit Clicked");
        authHandler(dbAccount, dbPin);
      })
      .catch(err => {
        setIsError(true);
        console.log(err);
      });
  };

  return (
    <>
      {isAuthenticated ? (
        <customerContext.Provider value={accountData}>
          <Home />
        </customerContext.Provider>
      ) : (
        <div className="login-container">
          <form onSubmit={handleSubmit} method="post">
            <h2>Login</h2>
            <div className="input">
              <div className="label">
                <label htmlFor="account_number">A/C No.</label>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  name="account_number"
                  id="account_number"
                  onChange={e => setAccount(e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <div className="label">
                <label htmlFor="pin">PIN </label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  name="pin"
                  id="pin"
                  onChange={e => setPin(e.target.value)}
                />
              </div>
            </div>
            <button className="btn" type="submit">
              Confirm
            </button>
            {isError ? (
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  marginTop: "10px"
                }}
              >
                Invalid Account or PIN
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  marginTop: "10px"
                }}
              ></div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
