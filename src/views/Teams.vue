<template>
    <v-card style="width: 100%; height: 85vh; padding: 1rem">
        <div class="text-right mr-4">
            <v-btn color="green darken-2" :to="`/teams/add`" dark>Criar novo time</v-btn>
        </div>
        
        <v-data-table style="padding: 1rem; margin: 1rem 0 0 0" :headers="computedHeaders" :items="computedTeams" :users="computedUsers"  show-expand>
            <template v-slot:item.name ="{ item }">
                <span> {{ item.name }} </span>
            </template>

            <template v-slot:item.admin="{ item }">
                <span>{{ item.admin }}</span>
            </template>

            <template v-slot:item.users="{ item }">
                <span>{{ item.users.length }}</span>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon :to="`/team/info/${item.id}`"> <v-icon color="blue darken-1">info</v-icon> </v-btn>
                <v-btn icon @click=";dialogEdit = true;"> <v-icon>edit</v-icon> </v-btn>
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
        users: [],
        headers: [
          { text: 'Nome do time', value: 'name'},
          { text: 'Administrador', value: 'admin'},
          { text: 'Número de Participantes', value: 'users',},
          { text: 'Ações', value: 'actions'},
        ],
      }
    },
    methods:{
        getTeams() {
          let res = api.findAllTeam().then(data => {
            this.teams = data;
            data.forEach(element => {
                this.setUsers(element.users)
            });
          });
        },
        setUsers(users) {
            this.users += users;
        }
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
        },
        computedUsers() {
            return this.users;
        }
    },
}
</script>