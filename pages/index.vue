<template>
  <div>
    <div v-if="vols">
      <FlightOptionModal
        :key="modalIncrement"
        :optionModal="vols[modalOfIndexFlight]"
        :modal="modalOfFlightOption"
      />
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
        v-if="selectDate && vols"
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
    <div v-else>
      <div class="divContainerErreur">
        Oh no ! On ne trouve pas de vols disponibles, nous somme entrain
        d'investigé, veuillez réessayer utérieurement
        <img
          class="imgSadEmoji"
          src="~/static/Sad-emoji.webp"
          alt="emoji triste"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { flightService } from "@/core/api/indexService";
import FlightComposant from "@/components/Flight.vue";
import FlightDiscountComposant from "@/components/FlightDiscount.vue";
import FlightOptionModal from "@/components/modals/FlightOptionModal.vue";

export default {
  name: "IndexPage",
  components: {
    FlightComposant,
    FlightDiscountComposant,
    FlightOptionModal,
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
      modalOfFlightOption: false,
      modalIncrement: 1,
      modalOfIndexFlight: 0,
    };
  },
  async mounted() {
    const nowDate = new Date();
    let finalDate = nowDate.toLocaleDateString("fr");

    this.vols = await flightService.getAllFights(
      this.actualCurrency,
      finalDate
    );
    await flightService.getCurrencies().then((response) => {
      this.currenciesList = response;
    });

    this.$nuxt.$on("BookFlight", async (val) => {
      this.incrementFlightComponent++;
      this.modalOfFlightOption = true;
      this.modalOfIndexFlight = val;
      this.modalIncrement++;
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
    this.$nuxt.$on("BookFlightWithOption", async (food, data) => {
      await this.bookFlight(data);
      this.refreshFlight();
      this.incrementFlightComponent++;
      this.modalOfFlightOption = false;
      this.modalIncrement++;
    });
    this.$nuxt.$on("getBack", () => {
      this.showPromotion = false;
    });
    console.log(this.vols);
  },
  methods: {
    async dateClick() {
      this.refreshFlight();
      this.selectDate = true;
    },
    async bookFlight(data) {
      console.log("cc");
      if (!this.datePicker) {
        const bookFlight = { ...data, date: new Date().toLocaleDateString() };
        await flightService.bookFlight(bookFlight);
      } else {
        const bookFlight = {
          ...data,
          date: new Date(this.datePicker).toLocaleDateString(),
        };
        await flightService.bookFlight(bookFlight);
      }
    },
    async refreshFlight() {
      if (!this.datePicker) {
        let newdate = new Date().toLocaleDateString();
        this.vols = await flightService.getAllFights(
          this.actualCurrency,
          newdate
        );
      } else {
        this.vols = await flightService.getAllFights(
          this.actualCurrency,
          new Date(this.datePicker).toLocaleDateString()
        );
      }
    },
    async refreshCurrency() {
      this.vols = await flightService.getAllFights(this.actualCurrency);
    },
  },
};
</script>

<style lang="scss" scoped>
.divContainerErreur {
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imgSadEmoji {
  margin-top: 5%;
  width: 30%;
}
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
