<template>
  <div>
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
            <th class="header-flights" id="Discount">Vol avec escale</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in vols" :key="item.id">
            <td class="td-flight">{{ item.id }}</td>
            <td class="td-flight">{{ item.airportDeparture }}</td>
            <td class="td-flight">{{ item.airportArrival }}</td>
            <td class="td-flight">{{ item.price }} {{ actualCurrency }}</td>
            <td class="td-flight">{{ item.seats }}</td>
            <td class="td-flight">
              <v-btn
                class="btnStyle"
                variant="outlined"
                elevation="4"
                v-if="item.seats > 0"
                @click="bookFlight(index)"
              >
                Réserver
              </v-btn>
            </td>
            <td class="td-flight">
              <v-btn
                class="btnStyle"
                variant="outlined"
                elevation="4"
                v-if="item?.discounts?.length > 0"
                @click="clickShowPromotion(index)"
              >
                Promotion
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
    <v-btn
      class="btnStyle btnfullWidth"
      variant="outlined"
      elevation="4"
      @click="selectAnotherDate"
    >
      Selectionner une autre date
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Flight",
  props: {
    datePicker: {
      type: String,
      default: new Date(),
    },
    vols: {
      type: Array,
      default: [],
    },
    actualCurrency: {
      type: String,
      default: "USD",
    },
  },
  created() {
    console.log(this.vols);
  },
  methods: {
    dateTraitement(date) {
      if (!date) {
        return new Date().toLocaleDateString("fr");
      } else {
        let useDate = new Date(date);
        return useDate.toLocaleDateString("fr");
      }
    },
    async bookFlight(indexOfFlight) {
      this.$nuxt.$emit("BookFlight", indexOfFlight);
    },
    clickShowPromotion(idVol) {
      this.$nuxt.$emit("FlightDiscount", idVol);
    },
    selectAnotherDate() {
      this.$nuxt.$emit("AnotherDate");
    },
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

.td-flight {
  text-align: center;
}
.btnfullWidth {
  width: 100%;
}
</style>
