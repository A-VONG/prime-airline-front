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
            <th class="header-flights" id="Place">Place restant</th>
            <th class="header-flights" id="Discount">Promotion</th>
            <th class="header-flights" id="Buy">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="flightDiscount in discountFlight?.discounts"
            :key="flightDiscount.id"
          >
            <td class="td-flight">
              {{ flightDiscount.flight.airportDeparture }}
            </td>
            <td class="td-flight">{{ flightDiscount.escale }}</td>
            <td class="td-flight">
              {{ flightDiscount.flight.airportArrival }}
            </td>
            <td class="td-flight">
              {{ flightDiscount.flight.price }} {{ actualCurrency }}
            </td>
            <td class="td-flight">{{ flightDiscount.flight.seats }}</td>
            <td class="td-flight">{{ flightDiscount.percent * 100 }} %</td>
            <td class="td-flight">
              <v-btn
                v-if="flightDiscount.flight.seats > 0"
                variant="outlined"
                @click="bookFlight(flightDiscount.flight.id, 'rathesh')"
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
    async bookFlight(id, user) {
      const data = {
        userId: user,
        flightId: id,
      };
      this.$nuxt.$emit("BookFlight", true);
      this.books = await flightService.bookFlight(data);
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
