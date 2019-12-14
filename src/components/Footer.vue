<template>
  <div class="text-right">  
      <span class="subtitle-1"><v-spacer></v-spacer>Stiick Co. <span @click="switchMode()">&copy;</span> 2019</span>
  </div>
  
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "@/auth.js";

  export default {
    mounted () {
      this.getMode();

    },
    data: () => ({

    }),
    methods: {
       switchMode(){
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem('darkMode', this.$vuetify.theme.dark);
      },
      getMode(){
        this.$vuetify.theme.dark = JSON.parse(localStorage.getItem('darkMode'));
        console.log(this.$vuetify.theme.dark);        
      }
    },

  }
</script>
