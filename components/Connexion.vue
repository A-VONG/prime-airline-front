<template>
  <div>
    <v-text-field v-model="email" placeholder="Email"></v-text-field>
    <v-text-field
      v-model="password"
      placeholder="Password"
      type="password"
    ></v-text-field>

    <v-btn @click="login()">Connexion</v-btn>
    <v-btn @click="getBack()"> Retour </v-btn>
  </div>
</template>
<script>
import { flightService } from "@/core/api/indexService";

export default {
  name: "connexion",
  components: {
    flightService,
  },
  data: () => ({
    email: null,
    password: null,
  }),
  methods: {
    getBack() {
      this.$nuxt.$emit("getBack", "login");
    },
    async login() {
      const account = {
        email: this.email.toLowerCase(),
        password: this.password,
      };
      await flightService.loginAccount(account).catch((e) => {
        console.error(e.message);
      });
      await flightService.getAccount().then((getAccount) => {
        this.$store.commit("account/setAccount", getAccount);
        this.$router.push("/");
      });
    },
  },
};
</script>
