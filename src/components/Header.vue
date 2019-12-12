<template>
  <div v-if="this.$auth.isAuthenticated()">
      
    <v-toolbar :style="{'position':'fixed', 'z-index':'88'}" class="mt-n2" width="100%" color="green darken-1" dark>
     
     
      <v-header bottom class="display-1" v-if="profile">StiickStock</v-header>
      <v-spacer></v-spacer>
      
      <!-- ***** MENU DESKTOP ***** -->
        <v-toolbar-items class="d-none d-sm-flex">
        <v-btn text to="/"> <v-icon>home</v-icon> Inicio</v-btn>
        <v-btn text to="/products"> <v-icon>shopping_basket</v-icon> Produtos  </v-btn>  
        <v-btn text @click="dialogProfile = true"><v-icon>person</v-icon>Perfil </v-btn>
        <v-btn text @click="logout"><v-icon>exit_to_app</v-icon>Sair</v-btn>        
        </v-toolbar-items>

    </v-toolbar>

    <!-- ***** MENU MOBILE ***** -->
   <v-navigation-drawer  mobile-break-point=0 :app="mobile" class="d-sm-none text-center mt-11 pl-1 ml-n4" width="100">
      <v-list>
      <v-list-item class="" to="/">
        <v-list-item-content>
          <v-icon>home</v-icon>
          <span>Inicio</span>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item to="/products">
        <v-list-item-content>
          <v-icon>shopping_basket</v-icon>
          <span>Produtos</span>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
      <v-list-item @click="dialogProfile = !dialogProfile">
        <v-list-item-content>
            <v-icon>person</v-icon>
          <span>Perfil</span>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
      <v-list-item @click="logout()">
        <v-list-item-content>
            <v-icon>exit_to_app</v-icon>
            <span>Sair</span>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

  <!-- ***** PROFILE CARD ***** -->
    <v-navigation-drawer class="mt-11 pt-2" :style="{'position':'fixed','z-index':'8'}" v-model="dialogProfile" :right="!mobile" temporary height="300" width="200">
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
        <v-divider></v-divider>

      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pl-4 pb-1">
          <v-btn text @click="switchMode()"><v-icon>wb_sunny</v-icon> Tema escuro</v-btn>
        </div>
      </template>
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
