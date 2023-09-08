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
      <v-col v-if="showPromotion">
        <FlightDiscountComposant
          :key="incrementFlightComponent"
          :datePicker="datePicker"
          :actualCurrency="actualCurrency"
          :vols="vols"
          :indexOfFlight="indexOfFlightdiscount"
        />
      </v-col>
      <v-col v-if="!showPromotion">
        <FlightComposant
          :key="incrementFlightComponent"
          :datePicker="datePicker"
          :actualCurrency="actualCurrency"
          :vols="vols"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { flightService } from "@/core/api/indexService";
import FlightComposant from "@/components/Flight.vue";
import FlightDiscountComposant from "@/components/FlightDiscount.vue";

export default {
  name: "IndexPage",
  components: {
    FlightComposant,
    FlightDiscountComposant,
  },
  data() {
    return {
      selectDate: false,
      vols: [],
      books: [],
      datePicker: null,
      minDate: new Date().toISOString().substr(0, 10),
      currenciesList: [],
      actualCurrency: "USD",
      showPromotion: false,
      incrementFlightComponent: 1,
      indexOfFlightdiscount: null,
    };
  },
  async mounted() {
    this.vols = await flightService.getAllFights(this.actualCurrency);
    await flightService.getCurrencies().then((response) => {
      this.currenciesList = response;
    });

    this.$nuxt.$on("BookFlight", async (val) => {
      if (val) {
        this.vols = await flightService.getAllFights(this.actualCurrency);
        this.incrementFlightComponent++;
      }
    });
    this.$nuxt.$on("FlightDiscount", async (indexOfFlightdiscount) => {
      this.showPromotion = true;
      this.indexOfFlightdiscount = indexOfFlightdiscount;
      this.incrementFlightComponent++;
    });
    this.$nuxt.$on("AnotherDate", () => {
      this.datePicker = null;
      this.selectDate = false;
    });

    this.$nuxt.$on("getBack", () => {
      this.showPromotion = false;
    });
    console.log(this.vols);
  },
  methods: {
    dateClick() {
      if (!this.datePicker) {
        this.datePicker = new Date().toLocaleDateString();
      }
      this.selectDate = true;
    },

    async refreshCurrency() {
      this.vols = await flightService.getAllFights(this.actualCurrency);
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
.spaceDatePicker {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.td-flight {
  text-align: center;
}
.selectDateDiv {
  display: flex;
  flex-direction: column;
}
.currenciesSelect {
  width: 250px;
}
</style>
