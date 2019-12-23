<template>
  <!-- TEAMS -->
  <div>
    <!-- PROFILE -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>person</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="`${user.picture}`"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            {{user.nickname}}
          </v-list-item-content>                
        </v-list-item>

        <v-divider></v-divider>
        
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> <v-icon color="green">email</v-icon>  {{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-content>
              <v-icon>exit_to_app</v-icon>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  mounted(){
    this.getuserData();
  },
  data(){
    return{
      user:{},
    }
  },
  methods:{
    getuserData(){
        this.user = JSON.parse(localStorage.getItem('user'));
      },
    logout(){
        this.$auth.logout();
      },
  }
}
</script>