<template>
  <div>
    <v-text-field v-model="username" placeholder="Username"></v-text-field>
    <v-text-field
      v-model="email"
      placeholder="Email"
      :rules="rulesEmail"
    ></v-text-field>
    <v-text-field
      v-model="password"
      placeholder="Password"
      type="password"
      :rules="rulesPassword"
    ></v-text-field>

    <v-btn @click="signin()">Inscription</v-btn>
    <v-btn @click="getBack()"> Retour </v-btn>
  </div>
</template>
<script>
import { flightService } from "@/core/api/indexService";

export default {
  name: "inscription",
  components: {
    flightService,
  },
  data: () => ({
    rulesEmail: [
      (value) => !!value || "Required.",
      (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    ],
    rulesPassword: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 7) || " min 7 characters",
    ],
    email: null,
    username: null,
    password: null,
  }),
  methods: {
    getBack() {
      this.$nuxt.$emit("getBack", "signin");
    },
    async signin() {
      let createAccount = {
        email: this.email,
        password: this.password,
        name: this.username,
      };
      await flightService.signinNewAccount(createAccount);
      this.$nuxt.$emit("getBack", "signin");
    },
  },
};
</script>
