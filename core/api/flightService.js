import Axios from "./callService";

let getAllFights = (currency, date) => {
  return Axios.get(`/flights?currency=${currency}&date=${date}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let bookFlight = (data) => {
  return Axios.post("/book", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let getCurrencies = () => {
  return Axios.get("/currencies")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let signinNewAccount = (account) => {
  return Axios.post("/signin", account)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let loginAccount = (account) => {
  return Axios.post("/login", account)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let getAccount = () => {
  return Axios.get("/me")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let logout = () => {
  return Axios.post("/logout")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const flightService = {
  getAllFights,
  bookFlight,
  getCurrencies,
  signinNewAccount,
  loginAccount,
  getAccount,
  logout,
};
