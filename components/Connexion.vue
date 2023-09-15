<template>
  <div>
    <v-text-field
      color="orange"
      v-model="email"
      placeholder="Email"
    ></v-text-field>
    <v-text-field
      color="orange"
      v-model="password"
      placeholder="Password"
      type="password"
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
          console.error(e.message);
        });
        await flightService.getAccount().then((getAccount) => {
          this.$store.commit("account/setAccount", getAccount);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.blockBtn {
  display: flex;
  flex-direction: column;
  .btnStyle {
    margin-bottom: 1%;
  }
}
</style>
