<template>
  <div>
    <v-dialog v-model="showModal" width="500px">
      <v-card v-if="meals?.length" class="option-card">
        <div style="heigth:350px">
          <v-select
            color="secondary"
            label="Veuillez choisir la nourriture que vous souhaitez"
            :items="meals"
          ></v-select>
        </div>
        <v-card-actions>
          <v-btn
            class="btnStyle"
            variant="outlined"
            elevation="4"
            block
            @click="confirmBook()"
            >Validé la commande</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-else class="option-card">
        <p>Vous n'avez pas de nourriture à bord</p>
        <v-btn
          class="btnStyle"
          variant="outlined"
          elevation="4"
          block
          @click="confirmBook()"
          >Validé la réservation</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ModalOptionFlight",
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    optionModal: {
      type: Object,
      default() {
        return {};
      },
    },
    indexOfFlightDiscount: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      modalData: false,
    };
  },
  computed: {
    showModal: {
      get() {
        return this.modal; // Getter pour récupérer la valeur de showModal
      },
      set(value) {
        this.modalData = value ?? false; // Setter pour mettre à jour la valeur de showModal
      },
    },
    meals() {
      let arrayMeals = [];
      if (typeof this.indexOfFlightDiscount === "number") {
        this.optionModal?.discounts[
          this.indexOfFlightDiscount
        ]?.flight.meals.forEach((meals) => {
          if (meals.quantity > 0) arrayMeals.push(meals.name);
        });
        return arrayMeals;
      } else {
        this.optionModal.meals.forEach((meals) => {
          if (meals.quantity > 0) arrayMeals.push(meals.name);
        });
        return arrayMeals;
      }
    },
  },
  methods: {
    async confirmBook() {
      if (typeof this.indexOfFlightDiscount === "number") {
        const data = {
          userId: this.$store.state?.account?.accountData.id,
          flightId:
            this.optionModal?.discounts[this.indexOfFlightDiscount]?.flight.id,
        };
        this.$nuxt.$emit("BookFlightWithOption", "data", data);
      } else {
        const data = {
          userId: this.$store.state?.account?.accountData.id,
          flightId: this.optionModal.id,
        };
        this.$nuxt.$emit("BookFlightWithOption", "data", data);
      }
    },
  },
};
</script>

<style scoped>
.option-card{
  padding: 50px;
}
</style>
