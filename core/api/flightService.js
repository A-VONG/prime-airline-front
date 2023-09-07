export default (axios) => ({
  APIGetAllFlight() {
    return axios.get("/flights");
  },
});
