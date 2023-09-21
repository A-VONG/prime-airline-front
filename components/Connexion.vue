<template>
  <div class="input-div">
    <v-snackbar :timeout="2000" v-model="empty" color="red" multi-line>
      Les champs sont vide.
    </v-snackbar>
    <v-snackbar
      :timeout="2000"
      v-model="wrongCredential"
      color="red"
      multi-line
    >
      Les informations sont pas valide.
    </v-snackbar>
    <v-text-field
      color="orange"
      v-model="email"
      placeholder="Email"
      @keyup.enter="login()"
    ></v-text-field>
    <v-text-field
      color="orange"
      v-model="password"
      placeholder="Mot de passe"
      type="password"
      @keyup.enter="login()"
    ></v-text-field>
    <div class="blockBtn">
      <v-btn class="btnStyle" variant="outlined" elevation="4" @click="login()"
        >Connexion</v-btn
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
  name: "connexion",
  components: {
    flightService,
  },
  data: () => ({
    email: null,
    password: null,
    wrongCredential: false,
    empty: false,
  }),
  methods: {
    getBack() {
      this.$nuxt.$emit("getBack", "login");
    },
    async login() {
      if (this.email && this.password) {
        const account = {
          email: this.email.toLowerCase(),
          password: this.password,
        };
        await flightService.loginAccount(account).catch((e) => {
          this.wrongCredential = true;
          return;
        });
        await flightService
          .getAccount()
          .then((getAccount) => {
            this.$store.commit("account/setAccount", getAccount);
            this.$router.push("/");
          })
          .catch((err) => {
            this.$store.commit("account/setAccount", null);
            localStorage.removeItem("accountData");
          });
      } else {
        this.empty = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.blockBtn {
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
