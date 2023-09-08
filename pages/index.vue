<template>
  <div>
    <div v-if="!selectDate" @click:save="dateClick()">
      <v-form class="spaceDatePicker">
        <v-date-picker
          color="secondary"
          v-model="datePicker"
          :min="minDate"
          header="Veuillez choisir votre date"
        ></v-date-picker>
        <v-btn @click="dateClick()"> Je choisi cette date</v-btn>
      </v-form>
    </div>
    <v-row
      v-if="selectDate"
      class="selectDateDiv"
      justify="center"
      align="center"
    >
      <v-col>
        <v-card>
          <v-card-title class="headline">
            Liste des vols disponnibles pour le {{ dateTraitement(datePicker) }}
          </v-card-title>

          <table fixed-header height="300px" density="comfortable">
            <thead>
              <tr>
                <th class="header-flights" id="IdFlight">Numéro du vol</th>
                <th class="header-flights" id="Depart">Lieu de départ</th>
                <th class="header-flights" id="Arrival">Lieu d'arrivée</th>
                <th class="header-flights" id="Price">Price</th>
                <th class="header-flights" id="Place">Place restant</th>
                <th class="header-flights" id="Buy">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in vols" :key="item.id">
                <td class="td-flight">{{ item.id }}</td>
                <td class="td-flight">{{ item.airportDeparture }}</td>
                <td class="td-flight">{{ item.airportArrival }}</td>
                <td class="td-flight">{{ item.price }} €</td>
                <td class="td-flight">{{ item.seats }}</td>
                <td class="td-flight">
                  <v-btn
                    v-if="item.seats > 0"
                    variant="outlined"
                    @click="bookFlight(item.id, 'rathesh')"
                  >
                    Réserver
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { flightService } from "@/core/api/indexService";

export default {
  name: "IndexPage",
  data() {
    return {
      selectDate: false,
      vols: [],
      books: [],
      datePicker: null,
      minDate: new Date().toISOString().substr(0, 10),
    };
  },
  async mounted() {
    this.vols = await flightService.getAllFights();
    console.log(this.vols);
  },
  methods: {
    async bookFlight(id, user) {
      const data = {
        userId: user,
        flightId: id,
      };
      this.books = await flightService.bookFlight(data);
      this.vols = await flightService.getAllFights();
    },
    dateClick() {
      if (!this.datePicker) {
        this.datePicker = new Date().toLocaleDateString();
      }
      this.selectDate = true;
    },
    dateTraitement(date) {
      let useDate = new Date(date);
      return useDate.toLocaleDateString("fr");
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
  margin-bottom: 15px;
}

th {
  width: 300px;
}

.header-flights {
  text-align: center;
  width: 400px;
}
.spaceDatePicker {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.td-flight {
  text-align: center;
}
</style>
