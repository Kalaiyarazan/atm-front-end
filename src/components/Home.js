import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { customerContext } from "./Login";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [newPin, setNewPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [message, setMessage] = useState({});

  const customer = useContext(customerContext);

  const onDeposit = e => {
    e.preventDefault();
    console.log("deposit clicked");
    const balance_update = Number(userData.balance) + Number(deposit);
    setUserData({ ...userData, balance: balance_update });
    e.target.reset();
    setMessage({ depositMsg: `Rs.${deposit} Deposit Success` });
  };

  const onWithdraw = e => {
    e.preventDefault();
    const balance_update = Number(userData.balance) - Number(withdraw);
    if (balance_update >= 0) {
      setUserData({ ...userData, balance: balance_update });
      e.target.reset();
      setMessage({ withdrawMsg: `Rs.${withdraw} Withdrawn Success` });
    } else {
      e.target.reset();
      setMessage({ withdrawErrorMsg: `No Sufficient Balance to Withdraw` });
    }
  };

  const onChangePin = e => {
    e.preventDefault();
    console.log(Number(oldPin), userData.pin, Number(newPin));
    if (Number(oldPin) === userData.pin && Number(newPin) !== userData.pin) {
      setUserData({ ...userData, pin: Number(newPin) });
      e.target.reset();
      setMessage({ pinMsg: `Pin Change Success` });
    } else if (Number(oldPin) !== userData.pin) {
      e.target.reset();
      setMessage({ pinErrorMsg: `Incorrect Old Pin` });
    } else if (userData.pin === Number(newPin)) {
      e.target.reset();
      setMessage({ pinErrorMsg: `Last Pin Cannot be New Pin` });
    }
  };

  const onLogOut = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    axios
      .get(
        `https://atm-backend-server.herokuapp.com/customer/${customer.account_number}`
      )
      .then(response => setUserData(response.data[0]))
      .catch(err => console.log(err));
  }, [customer]);

  useEffect(() => {
    axios
      .put(
        `https://atm-backend-server.herokuapp.com/customer/${userData._id}`,
        userData
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }, [userData]);

  return (
    <div className="home-container">
      <div className="row-1">
        <div className="bank-detail">
          <h1>SDFC BANK</h1>
          <h2>ATM</h2>
        </div>
        <div className="user-detail">
          <h3>Welcome {userData.name}!</h3>
          <p>A/C No : {userData.account_number}</p>
          <button className="btn" onClick={onLogOut} type="submit">
            Log Out
          </button>
        </div>
      </div>

      <div className="row-2">
        <div className="balance-check">
          <h2>Current Balance</h2>
          <h1>Rs. {userData.balance}/-</h1>
        </div>
        <div className="deposit">
          <h2>Deposit Amount</h2>
          <form onSubmit={onDeposit} method="post">
            <input
              type="number"
              name="deposit"
              id="deposit"
              onChange={e => setDeposit(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
            <br />
            <br />
            {message.depositMsg ? (
              <p style={{ color: "green" }}>{message.depositMsg}</p>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className="withdraw">
          <h2>Withdraw Amount</h2>
          <form onSubmit={onWithdraw} method="post">
            <input
              type="number"
              name="withdraw"
              id="withdraw"
              onChange={e => setWithdraw(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
            <br />
            <br />
            {message.withdrawMsg ? (
              <p style={{ color: "green" }}>{message.withdrawMsg}</p>
            ) : (
              <p style={{ color: "red" }}>{message.withdrawErrorMsg}</p>
            )}
          </form>
        </div>
      </div>

      <div className="row-3">
        <div className="new-pin">
          <h2>Change Pin</h2>
          <form onSubmit={onChangePin} method="post">
            <div className="old-pin-change">
              <div>
                <label htmlFor="oldPin">Old Pin : </label>
              </div>
              <div>
                <input
                  type="password"
                  name="oldPin"
                  id="oldPin"
                  onChange={e => setOldPin(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="new-pin-change">
              <div>
                <label htmlFor="newPin">New Pin : </label>
              </div>
              <div>
                <input
                  type="password"
                  name="newPin"
                  id="newPin"
                  onChange={e => setNewPin(e.target.value)}
                />
              </div>
            </div>
            <br />
            <button type="submit">Submit</button>
            <br />
            <br />
            {message.pinMsg ? (
              <p style={{ color: "green" }}>{message.pinMsg}</p>
            ) : (
              <p style={{ color: "red" }}>{message.pinErrorMsg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
