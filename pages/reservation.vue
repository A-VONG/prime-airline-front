<template>
  <div>
    <v-card v-if="historyBook?.length > 0">
      <v-card-title class="headline">
        Voici l'historique de vos commandes
      </v-card-title>

      <table fixed-header height="300px" density="comfortable">
        <thead>
          <tr>
            <th class="header-flights" id="Depart">Lieu de départ</th>
            <th class="header-flights" id="Arrival">Lieu d'arrivée</th>
            <th class="header-flights" id="Price">Price</th>
            <th class="header-flights" id="Price">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, index) in historyBook" :key="history.id">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <td class="td-flight"
                  v-bind="attrs" v-on="on">{{ history.flight.airportDeparture.code }}
                </td>
              </template>
              <span>{{ history.flight.airportDeparture.name }}</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <td class="td-flight"
                  v-bind="attrs" v-on="on">{{ history.flight.airportArrival.code }}
                </td>
              </template>
              <span>{{ history.flight.airportArrival.name }}</span>
            </v-tooltip>

            <td class="td-flight">{{ history.flight.price }} $</td>
            <td class="td-flight">{{ history.date }}</td>
          </tr>
        </tbody>
      </table>
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
    };
  },
  async mounted() {
    let userId = this.$store.state.account.accountData.id;
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
