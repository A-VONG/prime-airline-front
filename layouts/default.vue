<template>
  <v-app dark>
    <v-navigation-drawer temporary v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title class="title">
        <img
          src="/prime-logo-no-title.png"
          alt="Logo with no title"
          width="50"
          height="50"
          style="margin-right: 5px"
        />
        {{ title }}
      </v-toolbar-title>

      <div
        class="userData"
        v-if="this.$store.state?.account?.accountData?.name"
      >
        {{ this.$store.state.account.accountData.name }}
      </div>

      <v-btn
        class="btnStyle logout"
        variant="outlined"
        elevation="4"
        @click="logout()"
        v-if="this.$store.state?.account?.accountData?.id"
      >
        Déconnexion</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { flightService } from "@/core/api/indexService";

export default {
  name: "DefaultLayout",
  components: {
    flightService,
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-calendar",
          title: "Liste des vols",
          to: "/",
        },
        {
          icon: "mdi-airplane",
          title: "Reservations",
          to: "/reservation",
        },
        {
          icon: "mdi-access-point",
          title: "Status",
          to: "/status",
        },
      ],
      miniVariant: false,
      right: true,
      title: "Prime Airline",
    };
  },
  methods: {
    async logout() {
      await flightService.logout();
      this.$store.commit("account/setAccount", null);
      localStorage.removeItem("accountData");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-left: 40%;
  margin-right: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logout {
  //margin-left: 20%;
}
.userData {
  margin-right: 5%;
}
</style>
