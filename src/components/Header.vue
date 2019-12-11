<template>
  <div >
      
    <v-toolbar class="mt-n4 pt-2" color="green darken-1" dark v-if="this.$auth.isAuthenticated()">
     
      <v-header bottom class="display-1" v-if="profile">StiickStock</v-header>

      <v-spacer></v-spacer>
        <v-toolbar-items>
        <v-btn icon @click="dialogProfile = true">
          <v-icon>person</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>        
        </v-toolbar-items>
 

    </v-toolbar>
   <v-navigation-drawer v-model="dialogProfile" absolute temporary right>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="`${user.picture}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{user.nickname}}</v-list-item-title>
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
    },
    data: () => ({
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],

      dialogProfile: false,
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
      }
    },
      
    computed: {
      ...mapState(["profile"])
    }
  }
</script>
