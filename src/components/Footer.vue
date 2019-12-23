<template>
  <div v-if="this.$auth.isAuthenticated()" class="text-right">  
      <span class="subtitle-1"><v-spacer></v-spacer>Stiick Co. <span @click="switchMode()">&copy;</span> 2019</span>
  </div>
  
</template>

<script>
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
      }
    },

  }
</script>
