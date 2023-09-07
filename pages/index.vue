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
              <td><v-btn variant="outlined" @click="bookFlight(item.id, 'rathesh')"> Réserver </v-btn></td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import getFlight from "~/core/action/flight"; // Remplacez '@/actions/' par le chemin relatif approprié
import axios from 'axios';
export default {
  name: "IndexPage",
  data() {
    return {
      vols: [],
      books: [],
    };
  },
   mounted() {
    axios.get('http://localhost:8080/flights')
      .then((response) => {
        //console.log(response.data);
        this.vols = response.data;
      })
      .catch((error) => {
        console.log(error)
        console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
      });
  },
  methods:{
     bookFlight(id, user) {
        console.log(id);
        console.log(user);
        axios.post('http://localhost:8080/book', { userId: user, flightId: id })
      .then((response) => {
        console.log(response.data);
        this.books = response.data;
      })
      .catch((error) => {
        console.log(error)
        console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
      });
    },
  }
};
</script>

<style scoped>
.headline {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

th{
  width: 300px;
}
</style>
