<template>
    <v-card style="width: 100%; height: 85vh; padding: 1rem">
        <div class="text-right mr-4">
            <v-btn color="green darken-2" :to="`/teams/add`" dark>Criar novo time</v-btn>
        </div>
        
        <v-data-table style="padding: 1rem; margin: 1rem 0 0 0" :headers="computedHeaders" :items="computedTeams"  show-expand>  
            <template v-slot:top>
                <div class="text-right mr-4"></div>
            </template>

            <template v-slot:item.name ="{ item }">
                <span> {{ item.name }} </span>
            </template>

            <template v-slot:item.admin="{ item }">
                <span>{{ item.admin }}</span>
            </template>

            <template v-slot:item.users="{ item }">
                <span>{{ item.users }}</span>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon :to="`/team/info/${item.id}`"> <v-icon color="blue darken-1">info</v-icon> </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
import { APIService } from "../resources/api";
const api = new APIService();
export default {
    name: "Teams",
    mounted () {
      this.getTeams()
    },
    data () {
      return {
        product: [],
        teams: [],
        headers: [
          { text: 'Nome do time', value: 'teamName'},
          { text: 'Administrador', value: 'admin'},
          { text: 'Participantes', value: 'participants',},
          { text: 'Ações', value: 'actions'},
        ],
      }
    },
    methods:{
        getTeams() {
          let res = api.findAllTeam().then(data => {
            this.teams = data;
          });
        },
    },
    computed: {
        computedTeams(){
            return this.teams;
        },
        computedHeaders(){
            if (this.filterID){
                return this.headers.filter(headers => headers.text != "ID");
            }
            return this.headers;
        }
    },
}
</script>