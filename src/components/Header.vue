<template>
  <div v-if="this.$auth.isAuthenticated()">
      
    <v-toolbar fixed app  width="100%" light>
     
      <v-btn icon @click="drawerMini = !drawerMini">
          <v-icon>menu</v-icon>
        </v-btn>
      <v-header bottom class="headline" v-if="profile"> StiickStock</v-header>

      <v-spacer></v-spacer>
      
      <!-- ***** MENU DESKTOP ***** -->
        <v-toolbar-items class="d-none d-sm-flex">
          
        <v-btn icon @click="dialogTeams = true"><v-icon>group</v-icon> </v-btn>
        <v-btn icon @click="dialogProfile = true"><v-icon>person</v-icon> </v-btn>
        <v-btn icon @click="logout"><v-icon>exit_to_app</v-icon></v-btn>        
        </v-toolbar-items>

    </v-toolbar>

    <!-- ***** NEW MENU ? ***** -->
   <v-navigation-drawer  fixed mobile-break-point=0 v-model="drawerMini" color="blue-grey darken-1" :app="true" class="" >
      <v-toolbar flat dark color="blue-grey darken-2">
        <v-list>
            <v-list-item>
        <v-list-item-avatar>
          <v-img :src="`${user.picture}`"></v-img>
        </v-list-item-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{user.nickname}}</v-list-tile-title>
              </v-list-tile-content>
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
      <v-divider></v-divider>

      <v-list-item to="/products">
        <v-list-item-content>
          <v-icon>shopping_basket</v-icon>
        </v-list-item-content>
        <v-list-item-content>Produtos</v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
      <v-list-item @click="dialogProfile = !dialogProfile">
        <v-list-item-content>
            <v-icon>person</v-icon>
        </v-list-item-content>
        <v-list-item-content>Perfil</v-list-item-content>
      </v-list-item>

      <v-list-item @click="dialogTeams = !dialogTeams">
        <v-list-item-content>
            <v-icon>group</v-icon>
        </v-list-item-content>
        <v-list-item-content>Times</v-list-item-content>
      </v-list-item>
     
      <v-list-item @click="logout()">
        <v-list-item-content>
            <v-icon>exit_to_app</v-icon>
        </v-list-item-content>
        <v-list-item-content>Sair</v-list-item-content>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>

  <!-- ***** PROFILE CARD ***** -->
    <v-navigation-drawer class="mt-12 pt-2" :style="{'position':'fixed','z-index':'8'}" v-model="dialogProfile" :right="!mobile" temporary height="300" width="200">
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
    </v-navigation-drawer>

    <v-navigation-drawer class="mt-12 pt-2" :style="{'position':'fixed','z-index':'8'}" v-model="dialogTeams" :right="!mobile" temporary height="90" width="200">
      <v-btn text to="/teams"> <v-icon>group</v-icon> Times  </v-btn>
      <v-btn text to="/teams/add"> <v-icon>group_add</v-icon> Adicionar times  </v-btn>
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
      },

    },
      
    computed: {
      ...mapState(["profile"])
    }
  }
</script>
