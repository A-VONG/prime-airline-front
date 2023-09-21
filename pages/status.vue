<template>
  <v-row>
    <v-col class="text-center">
      <p :class="this.api1 ? 'greenApi' : 'redApi'">
        Data access service is : {{ this.api1 ? "Up" : "Down" }}
      </p>
      <p :class="this.api2 ? 'greenApi' : 'redApi'">
        Flight service is : {{ this.api2 ? "Up" : "Down" }}
      </p>
      <p :class="this.api3 ? 'greenApi' : 'redApi'">
        Booking service is : {{ this.api3 ? "Up" : "Down" }}
      </p>
      <p :class="this.api4 ? 'greenApi' : 'redApi'">
        FrontApi service is : {{ this.api4 ? "Up" : "Down" }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import { healthService } from "@/core/api/indexService";

export default {
  name: "status",
  components: {
    healthService,
  },
  data() {
    return {
      api1: null,
      api2: null,
      api3: null,
      api4: null,
    };
  },
  async mounted() {
    this.api1 = await healthService.getHealth8080();
    this.api2 = await healthService.getHealth8081();
    this.api3 = await healthService.getHealth8082();
    this.api4 = await healthService.getHealth8083();
  },
};
</script>
