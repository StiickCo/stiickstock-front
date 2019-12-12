<template>
  <div>  
    <v-footer fixed :style="{'z-index':'88'}" color="green darken-1" dark>
      <v-spacer></v-spacer>
      <span class="subtitle-1">Stiick Co. &copy; 2019</span>
      <v-spacer></v-spacer>
    </v-footer>

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
