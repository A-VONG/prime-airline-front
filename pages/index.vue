<template>
  <div>
    <div v-if="!selectDate">
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
        <v-select
          class="currenciesSelect"
          label="Selectionnez votre devise"
          :items="currenciesList"
          v-model="actualCurrency"
          @change="refreshCurrency"
          variant="outlined"
        ></v-select>
      </v-col>
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
                <td class="td-flight">{{ item.price }} {{ actualCurrency }} </td>
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
      currenciesList: [],
      actualCurrency: "USD",
    };
  }, 
  async mounted() {
    this.vols = await flightService.getAllFights(this.actualCurrency);
     await flightService.getCurrencies().then( (response) => {
        this.currenciesList = response;
      } );
    console.log(this.vols);
  },
  methods: {
    async bookFlight(id, user) {
      const data = {
        userId: user,
        flightId: id,
      };
      this.books = await flightService.bookFlight(data);
      this.vols = await flightService.getAllFights(this.actualCurrency);
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
    async refreshCurrency() {
      this.vols = await flightService.getAllFights(this.actualCurrency);
    }
  },
};
</script>

<style lang="scss" scoped>
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
.selectDateDiv{
  display: flex;
  flex-direction: column;
}
.currenciesSelect{
  width: 250px;
}
</style>
