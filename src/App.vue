<template>
  <v-app>
    
    <v-content class="ma-5">
      <Header class="ma-n5"/>
      <div>
        <router-view class="mt-12"></router-view>
      </div>
    </v-content>
    <Footer />
    
  </v-app>
</template>

<script>
import auth from "@/auth.js";
import router from './router';

export default {
  name: "App",
  mounted() {
    this.$auth.checkVuex();

    if (this.$auth.isAuthenticated()) {
      this.$store.dispatch("carregarPerfil", this.$auth.user);
    }
  },

  data: () => ({
    //
  })
};
</script>


<style>
#app {
  font-family: "Montserrat", "Roboto", Arial, sans-serif;
}
#formLogin {
  padding: 120px 0 0 0;
}
</style>