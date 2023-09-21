import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8083",
  withCredentials: true,
});

export default Axios;
