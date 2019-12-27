<template>
    <v-card style="width: 100%; height: 85vh; padding: 1rem">
        <div class="text-right mr-4">
            <v-btn color="green darken-2" :to="`/teams/add`" dark>Criar novo time</v-btn>
        </div>
        
        <v-data-table 
            style="padding: 1rem; margin: 1rem 0 0 0" 
            :headers="computedHeaders" 
            :items="computedTeams" 
            show-expand
            loading-text="Carregando... Por favor aguarde!"
            no-data-text="Nenhum time encontrado!"
            no-results-text="Time não encontrado!"
            loading=false
            >

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
                <v-btn icon @click="getTeam(item); dialogEdit = true;"> <v-icon>edit</v-icon> </v-btn>
            </template>
        </v-data-table>

        <!-- EDIT DIALOG -->
        <v-dialog v-model="dialogEdit" width="500">
            <v-card>
                <v-card-title class="headline green lighten-2" primary-title>Editar produto</v-card-title>
                
                <v-card-text>
                    <v-text-field required label="Nome do produto" v-model='team.name'></v-text-field>
                    <v-text-field 
                    label="Adicionar membro" 
                    v-model='newTeamUser'
                    append-icon="add_circle_outline" 
                    @click:append="addUser(newTeamUser); newTeamUser = ''">
                    </v-text-field>
                    <v-list v-for="user in team.users" :key="user">
                            <v-divider></v-divider>
                            <v-list-item>
                                <span>{{user}}</span>
                                <v-spacer></v-spacer>
                                <v-icon v-if="user !== team.admin" @click="removeUser(user)">highlight_off</v-icon>
                            </v-list-item>
                        </v-list>

                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-2" text @click="1+1">Salvar</v-btn>
                <v-btn color="red" text @click="dialogEdit = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
        team: [],
        teams: [],
        users: [],
        headers: [
          { text: 'Nome do time', value: 'name'},
          { text: 'Administrador', value: 'admin'},
          { text: 'Número de Participantes', value: 'users',},
          { text: 'Ações', value: 'actions'},
        ],
        dialogEdit: false,
        newTeamUser:' ',
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
        },
        addUser(user) {
            this.team.users.push(user);
        },
        removeUser(user){
          let userIndex = this.team.users.indexOf(user);
          this.team.users.splice(userIndex, 1);
        },
        getTeam(team){
            this.team.admin = team.admin;
            this.team.createdAt = team.createdAt;
            this.team.id = team.id;
            this.team.name = team.name;
            this.team.users = team.users;
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
    },
}
</script>