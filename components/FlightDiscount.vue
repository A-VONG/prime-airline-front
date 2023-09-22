<template>
  <div>
    <v-card>
      <v-card-title class="headline">
        La liste des promotions pour le {{ dateTraitement(datePicker) }}
      </v-card-title>

      <table fixed-header height="300px" density="comfortable">
        <thead>
          <tr>
            <th class="header-flights" id="Depart">Lieu de départ</th>
            <th class="header-flights" id="Depart">Escale</th>
            <th class="header-flights" id="Arrival">Lieu d'arrivée</th>
            <th class="header-flights" id="Price">Price</th>
            <th class="header-flights" id="Discount">Promotion</th>
            <th class="header-flights" id="Discount">Place restant</th>
            <th class="header-flights" id="Buy">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(flightDiscount, index) in discountFlight?.discounts"
            :key="flightDiscount.id"
          >
            <td class="td-flight">
              {{ flightDiscount.flight.airportDeparture }}
            </td>
            <td class="td-flight">{{ flightDiscount.flight.escale }}</td>
            <td class="td-flight">
              {{ flightDiscount.flight.airportArrival }}
            </td>
            <td class="td-flight">
              {{ flightDiscount.discountPrice }} {{ actualCurrency }}
            </td>
            <td class="td-flight">{{ flightDiscount.percent }} %</td>
            <td class="td-flight">{{ flightDiscount.flight.seats }}</td>
            <td class="td-flight">
              <v-btn
                class="btnStyle btnfullWidth"
                variant="outlined"
                elevation="4"
                @click="bookFlight(flightDiscount.flight.id, index)"
              >
                Réserver
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
    <v-btn class="btnfullWidth" @click="getBack()"> Retour en arriere </v-btn>
  </div>
</template>

<script>
import { flightService } from "@/core/api/indexService";

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
    indexOfFlight: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      discountFlight: null,
    };
  },
  mounted() {
    this.discountFlight = this.vols[this.indexOfFlight];
  },
  methods: {
    dateTraitement(date) {
      let useDate = new Date(date);
      return useDate.toLocaleDateString("fr");
    },
    async bookFlight(id, index) {
      this.$nuxt.$emit("BookFlight", this.indexOfFlight, index);
    },
    clickShowPromotion() {
      this.showPromotion = true;
    },
    getBack() {
      this.$nuxt.$emit("getBack");
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
.btnfullWidth {
  width: 100%;
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
</style>
