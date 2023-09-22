<template>
  <div>
    <v-snackbar :timeout="2000" v-model="deleted" color="green" multi-line>
      Le vol a bien été supprimé.
    </v-snackbar>

    <v-card v-if="historyBook?.length > 0" :key="increment">
      <v-card-title class="headline">
        Voici l'historique de vos commandes
      </v-card-title>

      <table fixed-header height="300px" density="comfortable">
        <thead>
          <tr>
            <th class="header-flights" id="Depart">Lieu de départ</th>
            <th class="header-flights" id="Arrival">Lieu d'arrivée</th>
            <th class="header-flights" id="Price">Price</th>
            <th class="header-flights" id="Date">Date</th>
            <th class="header-flights" id="Cancel">Annuler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, index) in historyBook" :key="history.id">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <td class="td-flight" v-bind="attrs" v-on="on">
                  {{ history.flight.airportDeparture.code }}
                </td>
              </template>
              <span>{{ history.flight.airportDeparture.name }}</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <td class="td-flight" v-bind="attrs" v-on="on">
                  {{ history.flight.airportArrival.code }}
                </td>
              </template>
              <span>{{ history.flight.airportArrival.name }}</span>
            </v-tooltip>

            <td class="td-flight">{{ history.flight.price }} $</td>
            <td class="td-flight">{{ history.date }}</td>
            <th class="header-flights" v-if="queue" :id="index">En cours...</th>
            <td>
              <v-btn
                v-if="!queue"
                class="btnfullWidth"
                @click="cancelFlight(index)"
              >
                Annulez le vol</v-btn
              >
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
    <v-card v-else>
      <v-card-title class="headline">
        Vous n'avez pas de commande
      </v-card-title>
    </v-card>
    <div>
      <v-btn class="btnfullWidth" @click="getBack()">
        Allez faire une commande</v-btn
      >
    </div>
  </div>
</template>

<script>
import { flightService } from "@/core/api/indexService";

export default {
  components: {
    flightService,
  },
  middleware: "middleware",
  name: "reservation",
  data() {
    return {
      historyBook: null,
      increment: 0,
      deleted: false,
      queue: false,
    };
  },
  async mounted() {
    const userId = this.$store.state.account.accountData.id;
    await flightService
      .history(userId)
      .then((history) => {
        this.historyBook = history;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    getBack() {
      this.$router.push("/");
    },
    async cancelFlight(index) {
      const bookingId = this.historyBook[index].bookingId;
      let dataBooking = {
        bookingId,
      };
      await flightService.cancelBook(dataBooking);
      this.deleted = true;
      this.queue = true;
      setTimeout(async () => {
        const userId = this.$store.state.account.accountData.id;
        await flightService
          .history(userId)
          .then((history) => {
            this.historyBook = history;
          })
          .catch((err) => {
            console.error(err);
          });
        this.increment++;
        this.queue = false;
      }, 3500);
      this.increment++;
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
