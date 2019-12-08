<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn to="/" text> Inicio </v-btn>
      <v-btn to="/products" text> Produtos </v-btn>
      
    </v-app-bar>

    <v-content>
      <!-- <HelloWorld/> -->
      <!-- <h1>asd</h1> -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
