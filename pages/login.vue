<template>
  <v-row>
    <v-col class="text-center">
      <p>
        <Inscription v-if="signin" />
        <Connexion v-if="login" />
        <div v-if="!signin && !login">
            <v-btn @click="signin = !signin"> signin </v-btn>
            <v-btn @click="login = !login"> login </v-btn>
        </div>
      </p>
    </v-col>
  </v-row>
</template>

<script>
import Inscription from "@/components/Inscription.vue";
import Connexion from "@/components/Connexion.vue";

export default {
  name: "login",
  components: {
    Inscription,
  },
  methods: {
    log() {
      this.$store.commit("account/setAccount", "J'ai crée un comtpe!!");
      this.$router.push("/");
      return;
    },
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
  data() {
    return {
      signin: false,
      login: false,
    };
  },
};
</script>
