<template>
  <v-row>
    <v-col class="text-center">
      <p :class="this.api1 ? 'greenApi' : 'redApi'">
        Fonctionnement de l'api numéro 1 {{ this.api1 ?? "No OK" }}
      </p>
      <p :class="this.api2 ? 'greenApi' : 'redApi'">
        Fonctionnement de l'api numéro 2 {{ this.api2 ?? "No OK" }}
      </p>
      <p :class="this.api3 ? 'greenApi' : 'redApi'">
        Fonctionnement de l'api numéro 3 {{ this.api3 ?? "No OK" }}
      </p>
      <p :class="this.api4 ? 'greenApi' : 'redApi'">
        Fonctionnement de l'api numéro 4 {{ this.api4 ?? "No OK" }}
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
