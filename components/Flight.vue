<template>
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
          <th class="header-flights" id="Discount">Promotion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vols" :key="item.id">
          <td class="td-flight">{{ item.id }}</td>
          <td class="td-flight">{{ item.airportDeparture }}</td>
          <td class="td-flight">{{ item.airportArrival }}</td>
          <td class="td-flight">{{ item.price }} {{ actualCurrency }}</td>
          <td class="td-flight">{{ item.seats }}</td>
          <td class="td-flight">
            <v-btn
              v-if="item.seats > 0"
              variant="outlined"
              @click="bookFlight(item.id, 'rathesh')"
            >
              Réserver
            </v-btn>
          </td>
          <td class="td-flight">
            <v-btn
              variant="outlined"
              v-if="item.discounts.length > 0"
              @click="clickShowPromotion"
            >
              Promotion
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>
<script>

</script>