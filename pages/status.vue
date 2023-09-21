<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://www.racksolutions.com/news/app/uploads/AdobeStock_90603827-1-scaled.jpeg"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-toolbar-title class="text-h6 white--text pl-0">
              Status des services
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            {{ new Date().toLocaleDateString("fr") }}
          </div>
          <v-timeline align-top dense>
            <v-timeline-item small :color="this.api1 ? 'green' : 'red'">
              <div>
                <div class="font-weight-normal">
                  <strong>Le service d'accés aux données</strong>
                </div>
                <div>
                  {{
                    this.api1
                      ? "Pas de problème detecté"
                      : "Nous rencontrons un problème technique. Veuillez reéssayer utérieurement"
                  }}
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item small :color="this.api2 ? 'green' : 'red'">
              <div>
                <div class="font-weight-normal">
                  <strong>Le service d'accés aux vols</strong>
                </div>
                <div>
                  {{
                    this.api2
                      ? "Pas de problème detecté"
                      : "Nous rencontrons un problème technique. Veuillez reéssayer utérieurement"
                  }}
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item small :color="this.api3 ? 'green' : 'red'">
              <div>
                <div class="font-weight-normal">
                  <strong>Le service d'accés aux reséversions</strong>
                </div>
                <div>
                  {{
                    this.api3
                      ? "Pas de problème detecté"
                      : "Nous rencontrons un problème technique. Veuillez reéssayer utérieurement"
                  }}
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item small :color="this.api4 ? 'green' : 'red'">
              <div>
                <div class="font-weight-normal">
                  <strong>Le service d'accés aux api fronts</strong>
                </div>
                <div>
                  {{
                    this.api4
                      ? "Pas de problème detecté"
                      : "Nous rencontrons un problème technique. Veuillez reéssayer utérieurement"
                  }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
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
