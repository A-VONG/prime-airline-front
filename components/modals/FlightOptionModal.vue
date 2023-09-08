<template>
  <div>
    <v-dialog v-model="modal" width="auto">
      <v-card v-if="optionModal.meals?.length > 0">
        <div>
          <v-select
            label="Veuillez choisir la nourriture que vous souhaitez"
            :items="optionModal.meals"
          ></v-select>
        </div>
        <v-card-actions>
          <v-btn color="primary" block @click="confirmBook()"
            >Validé la commande</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-else>
        Vous n'avez pas de nourriture à bord
        <v-btn color="primary" block @click="confirmBook()"
          >Validé la commande</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { flightService } from "@/core/api/indexService";

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
  },
  methods: {
    async confirmBook() {
      console.log(this.optionModal);
      const data = {
        userId: "Takoo",
        flightId: this.optionModal.id,
      };
      this.$nuxt.$emit("BookFlightWithOption", "foodfutur");

      await flightService.bookFlight(data);
    },
  },
};
</script>
