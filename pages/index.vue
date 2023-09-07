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
              <th class="text-left">Date de départ</th>
              <th class="text-left">Date d'arrivée</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in vols" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.airportDeparture }}</td>
              <td>{{ item.airportArrival }}</td>
              <td><v-btn variant="outlined"> Réserver </v-btn></td>
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

  async created() {
    const getFlight = await flightService.getAllFights();
    await flightService.bookFlight(data);
  },
  data() {
    return {
      vols: [
        {
          id: 1,
          airportDeparture: "02 Septembre 2023",
          airportArrival: "04 Octobre 2023",
        },
        {
          id: 2,
          airportDeparture: "05 Septembre 2023",
          airportArrival: "10 Octobre 2023",
        },
        {
          id: 3,
          airportDeparture: "15 Septembre 2023",
          airportArrival: "20 Octobre 2023",
        },
      ],
    };
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
