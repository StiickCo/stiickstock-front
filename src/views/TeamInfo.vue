<template>
  <v-card v-if="team">
    <v-card-title class="headline">{{team.name}}</v-card-title>

    <v-card-text class="subtitle-1">
      <v-layout row>
        <v-flex ml-3 xs2>
          <b>Dono do time:</b>
        </v-flex>

        <v-flex xs9>{{team.admin}}</v-flex>
      </v-layout>

      <v-layout row mt-3>
        <v-flex ml-3 xs2>
          <b>Número de membros:</b>
        </v-flex>

        <v-flex xs9>{{team.users.length}}</v-flex>
      </v-layout>

      <v-layout row mt-2>
        <v-flex ml-3 xs2 align-self-start>
        <b>Participantes do time:</b>
        </v-flex>

        <v-flex xs3>
            <v-list align-self-center v-for="user in team.users" :key="user">
                <v-list-item class="mb-n4">
                    <span>{{user}}</span>
                    <v-spacer></v-spacer>
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
        </v-flex>
      </v-layout>
      
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" dark to="/teams">Voltar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { APIService } from "../resources/api";
const api = new APIService();

export default {
    name: "ProductInfo",
    mounted () {
      this.getTeam()
    },
    data () {
      return {
        team: []
      }
    },
    methods:{
        getTeam(){
			api.findByIdTeam(this.$route.params.id).then(data => {
				this.team = data;
        console.log(this.team);
			});
        }
    },

}
</script>