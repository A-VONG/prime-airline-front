import flightService from "./flightService";

export default (axios) => ({
  flight: flightService(axios),
});
