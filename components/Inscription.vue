<template>
  <div class="input-div">
    <v-snackbar :timeout="2000" color="red" v-model="empty" multi-line>
      Des champs sont vide.
    </v-snackbar>
    <v-text-field
      color="secondary"
      v-model="username"
      placeholder="Nom d'utilisateur"
      @keyup.enter="signin()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      color="secondary"
      placeholder="Email"
      :rules="rulesEmail"
      @keyup.enter="signin()"
    ></v-text-field>
    <v-text-field
      color="secondary"
      v-model="password"
      placeholder="Mot de passe"
      type="password"
      :rules="rulesPassword"
      @keyup.enter="signin()"
    ></v-text-field>
    <div class="block-signin">
      <v-btn class="btnStyle" variant="outlined" elevation="4" @click="signin()"
        >Inscription</v-btn
      >
      <v-btn
        class="btnStyle"
        variant="outlined"
        elevation="4"
        @click="getBack()"
      >
        Retour
      </v-btn>
    </div>
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
      (value) => (value && value?.length >= 7) || " min 7 characters",
    ],
    email: null,
    username: null,
    password: null,
    empty: false,
  }),
  methods: {
    getBack() {
      this.$nuxt.$emit("getBack", "signin");
    },
    async signin() {
      if (this.email && this.password && this.username) {
        let createAccount = {
          email: this.email.toLowerCase(),
          password: this.password,
          name: this.username,
        };
        await flightService.signinNewAccount(createAccount);
        this.$nuxt.$emit("getBack", "signin");
      } else {
        this.empty = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.block-signin {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
    align-items: center;
  .btnStyle {
    margin-bottom: 1%;
    width: 50%;
  }
}

.input-div{
  margin-left: 50px;
  margin-right: 50px;
}
</style>
