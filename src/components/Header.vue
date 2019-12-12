<template>
  <div >
      
    <v-toolbar :style="{'position':'fixed', 'z-index':'88'}" class="mt-n4 pt-2" width="100%" color="green darken-1" dark v-if="this.$auth.isAuthenticated()">
     
      

      <v-btn tile icon @click="drawerMini = !drawerMini">
          <v-icon>menu</v-icon>
        </v-btn>
      <v-header bottom class="display-1" v-if="profile">StiickStock</v-header>

    </v-toolbar>

    <!-- ***** MENU ***** -->
   <v-navigation-drawer permanent mobile-break-point=0 app class="mt-11" mini-variant-width="60" :mini-variant.sync="drawerMini" width="220">
      <v-list>
      <v-list-item class="mt-n2" to="/">
        <v-list-item-content>
          <v-icon>home</v-icon>
        </v-list-item-content>
        <v-list-item-content>
          Inicio
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item to="/products">
        <v-list-item-content>
          <v-icon>shopping_basket</v-icon>
        </v-list-item-content>
        <v-list-item-content>
          Produtos
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
      <v-list-item @click="dialogProfile = !dialogProfile">
        <v-list-item-content>
            <v-icon>person</v-icon>
        </v-list-item-content>
        <v-list-item-content>
          Perfil
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
      <v-list-item @click="logout()">
        <v-list-item-content>
            <v-icon>exit_to_app</v-icon>
        </v-list-item-content>
        <v-list-item-content>
          Sair
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item @click="switchMode()">
        <v-list-item-content>
            <v-icon>wb_sunny</v-icon>
        </v-list-item-content>
        <v-list-item-content>
          Tema escuro
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>


  <!-- ***** PROFILE CARD ***** -->
    <v-navigation-drawer :style="{'position':'fixed','z-index':'88'}" v-model="dialogProfile" absolute temporary >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="`${user.picture}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          {{user.nickname}}
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-list-item-content>
          <v-btn @click="dialogProfile = false" icon rounded><v-icon>close</v-icon></v-btn>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> <v-icon color="green">email</v-icon>  {{ user.name }}</v-list-item-title>
          </v-list-item-content>
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
      this.getMode();
    },
    data: () => ({
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],

      dialogProfile: false,
      drawerMini: true,
      extended: false,
      extendedSlot: false,
      prominent: false,
      dense: false,
      collapse: false,
      flat: false,
      bg: false,
      extensionHeight: 48,
      user: [],
      wWidth: 0,
    }),
    methods: {
      logout(){
        this.$auth.logout();
      },
      getuserData(){
        this.user = JSON.parse(localStorage.getItem('user'));
      },
      getWidth(){
        this.wWidth = window.innerWidth;
      },
      switchMode(){
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem('darkMode', this.$vuetify.theme.dark);
      },
      getMode(){
        this.$vuetify.theme.dark = JSON.parse(localStorage.getItem('darkMode'));
        console.log(this.$vuetify.theme.dark);        
      }
    },
      
    computed: {
      ...mapState(["profile"])
    }
  }
</script>
