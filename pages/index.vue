<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Liste des vols disponnibles
        </v-card-title>

        <v-table fixed-header height="300px" density="comfortable">
          <thead>
            <tr>
              <th class="text-left">Numéro du vol</th>
              <th class="text-left">Lieu de départ</th>
              <th class="text-left">Lieu d'arrivée</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in vols" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.airportDeparture }}</td>
              <td>{{ item.airportArrival }}</td>
              <td>
                <v-btn
                  variant="outlined"
                  @click="bookFlight(item.id, 'rathesh')"
                >
                  Réserver
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { flightService } from "@/core/api/indexService";

export default {
  name: "IndexPage",

  data() {
    return {
      vols: [],
      books: [],
    };
  },
  async mounted() {
    this.vols = await flightService.getAllFights();
  },
  methods: {
    async bookFlight(id, user) {
      console.log(id);
      console.log(user);
      const data = {
        userId: user,
        flightId: id,
      };
      this.books = await flightService.bookFlight(data);
    },
  },
};
</script>

<style scoped>
.headline {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

th {
  width: 300px;
}
</style>
