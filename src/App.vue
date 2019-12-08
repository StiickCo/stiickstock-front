<template>
    <v-app>
    <loading
     :show="$route.path == '/callback'"
     :label="label">
       
    </loading>
    <core-view v-if="!$auth.isAuthenticated()"/>

    <div v-if="$auth.isAuthenticated()">
        <core-filter />

        <core-toolbar />

        <core-drawer />

        <core-view />
      </div>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

import loading from 'vue-full-loading'

export default {
  name: 'app',
  components: {
    loading
  },
   data(){
       return {
           label: 'Entrando...'
       }
   }
}
</script>
