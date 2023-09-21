import axios from "axios";

let getHealth8080 = () => {
  return axios
    .get(`http://localhost:8080/health`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let getHealth8081 = () => {
  return axios
    .get(`http://localhost:8081/health`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

let getHealth8082 = () => {
  return axios
    .get(`http://localhost:8082/health`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
let getHealth8083 = () => {
  return axios
    .get(`http://localhost:8083/health`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const healthService = {
  getHealth8080,
  getHealth8083,
  getHealth8082,
  getHealth8081,
};
