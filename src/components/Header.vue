<template>
  <div v-if="this.$auth.isAuthenticated()">
      
    <v-toolbar fixed width="100%" light>
     
      <v-btn icon @click="drawerMini = !drawerMini; storeDrawerState()">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-toolbar-title class="headline">
            <span id="stiick" class="header font-weight-medium">Stiick</span><span id="stock" class="header font-weight-thin">Stock </span> 
        </v-toolbar-title>
      <v-spacer></v-spacer>

        <Cards/> <!-- TEAMS AND PROFILE -->
        <v-btn icon @click="logout"><v-icon>exit_to_app</v-icon></v-btn>
    </v-toolbar>

    <Menu :menu="drawerMini"/>

  </div>
  
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "@/auth.js";

  export default {
    mounted () {
      this.getDrawerState();
    },
    data: () => ({
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
      drawerMini: false,
      extended: false,
      extendedSlot: false,
      prominent: false,
      dense: false,
      mobile:false,
      collapse: false,
      flat: false,
      bg: false,
      extensionHeight: 48,
    }),
    methods: {
      logout(){
        this.$auth.logout();
      },
      storeDrawerState(){
          localStorage.setItem('drawerShow', this.drawerMini);
      },
      getDrawerState(){
          let drawer = JSON.parse(localStorage.getItem('drawerShow'));
          drawer == null ? this.storeDrawerState(): this.drawerMini = drawer;
        }

    },
    computed: {
      ...mapState(["profile"])
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Encode+Sans+Semi+Condensed:100,200,500,600,700&display=swap');
.header{
    font-family: 'Encode Sans Semi Condensed', sans-serif;
}
</style> 