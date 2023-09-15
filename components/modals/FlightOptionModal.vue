<template>
  <div>
    <v-dialog v-model="showModal" width="auto">
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
  computed: {
    showModal: {
      get() {
        return this.modal; // Getter pour récupérer la valeur de showModal
      },
      set(value) {
        this.showModal = value; // Setter pour mettre à jour la valeur de showModal
      },
    },
  },
  methods: {
    async confirmBook() {
      const data = {
        userId: this.$store.account.accountData.id,
        flightId: this.optionModal.id,
      };
      this.$nuxt.$emit("BookFlightWithOption", "data", data);
    },
  },
};
</script>
