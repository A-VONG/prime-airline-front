import Service from "../api/service";

export default (context) => ({
  async getFlight() {
    return await Service(context.$axios)
      .flight.APIGetAllFlight()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Failed to get Flight -> ", error);
      });
  },
});
