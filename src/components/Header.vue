<template>
  <div>
    <v-toolbar color="primary" dark v-if="this.$auth.isAuthenticated()">
     
      <v-header class="display-1" v-if="profile">StiickStock</v-header>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/">Inicio</v-btn>
        <v-btn text to="/products">Produtos</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon to="">
          <v-icon>person</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "@/auth.js";

  export default {
    data: () => ({
      extended: false,
      extendedSlot: false,
      prominent: false,
      dense: false,
      collapse: false,
      flat: false,
      bg: false,
      extensionHeight: 48,
    }),
    methods: {
      logout(){
        this.$auth.logout();
      }
    },
    computed: {
      ...mapState(["profile"])
    }
  }
</script>