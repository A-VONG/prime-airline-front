import Axios from "./callService";

let getAllFights = () => {
  return Axios.get("/flights")
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
export const flightService = {
  getAllFights,
  bookFlight,
  getCurrencies,
};
