<template>
  <div v-if="this.$auth.isAuthenticated()">

    <!-- ***** NEW MENU ! ***** -->
   <v-navigation-drawer  fixed v-model="menu" color="blue-grey darken-1" app class="" >
      <v-toolbar flat dark color="blue-grey darken-2">
        <v-list>
            <v-list-item>
        <v-list-item-avatar>
          <v-img :src="`${user.picture}`"></v-img>
        </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{user.nickname}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

        </v-list>
      </v-toolbar>
      <v-list dark class="pt-0">
              <v-divider></v-divider>

      <v-list-item  to="/">
        <v-list-item-content>
          <v-icon>home</v-icon>
        </v-list-item-content>
        <v-list-item-content>Inicio</v-list-item-content>
      </v-list-item>

      <v-list-item to="/products">
        <v-list-item-content>
          <v-icon>shopping_basket</v-icon>
        </v-list-item-content>
        <v-list-item-content>Produtos</v-list-item-content>
      </v-list-item>
     
      <v-list-item @click="logout()">
        <v-list-item-content>
            <v-icon>exit_to_app</v-icon>
        </v-list-item-content>
        <v-list-item-content>Sair</v-list-item-content>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>
  
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "@/auth.js";

  export default {
    mounted () {
      this.getuserData();
      this.getWidth();
    },
    data: () => ({
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],

      dialogProfile: false,
      dialogTeams: false,
      drawerMini: true,
      extended: false,
      extendedSlot: false,
      prominent: false,
      dense: false,
      mobile:false,
      collapse: false,
      flat: false,
      bg: false,
      extensionHeight: 48,
      user: [],
    }),
    methods: {
      logout(){
        this.$auth.logout();
      },
      getuserData(){
        this.user = JSON.parse(localStorage.getItem('user'));
      },
      getWidth(){
        let wWidth = window.innerWidth;
        if (wWidth < 600){
          this.mobile = true;
        }
      }

    },
      
    computed: {
      ...mapState(["profile"])
    },
    props:["menu"],
  }
</script>
