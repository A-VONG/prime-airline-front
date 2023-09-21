<template>
  <div class="main">
    <v-col class="text-center">
      <img
          src="/prime-logo.png"
          alt="Logo with no title"
          width="250"
          height="250"
        />
      <p>
        <Inscription v-if="signin" />
        <Connexion v-if="login" />
        <div class="block-login" v-if="!signin && !login">
            <v-btn class="btnStyle login" variant="outlined" elevation="4"  @click="login = !login"> Connexion </v-btn>
            <v-btn class="btnStyle" variant="outlined" elevation="4" @click="signin = !signin"> Inscription </v-btn>
        </div>
      </p>
    </v-col>
  </div>
</template>

<script>
import Inscription from "@/components/Inscription.vue";
import Connexion from "@/components/Connexion.vue";
import { flightService } from "@/core/api/indexService";

export default {
  name: "login",
  components: {
    Inscription,
    Connexion,
    flightService
  },
   created() {
    this.$nuxt.$on("getBack", (val) => {
      if (val === "signin") {
        this.signin = false;
      } else {
        this.login = false;
      }
    });
  },
  mounted () {
    if (process.client) {
      const savedAccountData = localStorage.getItem("accountData");
      if (savedAccountData) {
        this.$store.commit("account/setAccount", JSON.parse(savedAccountData));
        this.$router.push("/");
      }
    };
  },
  data() {
    return {
      signin: false,
      login: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.block-login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login{
    margin-bottom: 10px;

}
 .btnStyle {
  width: 50%;
}
.main{
  display: flex;
    flex-direction: column;
      justify-content: center;
      align-items: center;
    background-color: rgb(32, 30, 30);
    width: 50%;
}
</style>
