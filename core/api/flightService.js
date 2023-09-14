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
export const flightService = {
  getAllFights,
  bookFlight,
  getCurrencies,
};
