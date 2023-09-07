import Service from "./api/service";
import AFlight from "./action/flight";

export default (context) => ({
  useApi: Service(context.$axios),
  useFlight: AFlight(context),
});
