<template>
    <v-card>
        <div class="text-right mr-5 pt-3">
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
            :loading="loading"
            >

            <template v-slot:item.name ="{ item }">
                <span> {{ item.name }} </span>
            </template>

            <template v-slot:item.admin="{ item }">
                <span>{{ item.admin }}</span>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon :to="`/team/info/${item.id}`"> <v-icon color="blue darken-1">info</v-icon> </v-btn>
                <v-btn icon @click="getTeam(item); dialogEdit = true;"> <v-icon>edit</v-icon> </v-btn>
            </template>
        </v-data-table>

        <!-- EDIT DIALOG -->
        <v-dialog v-model="dialogEdit" width="500">
            <v-card>
                <v-card-title class="headline green lighten-2" primary-title>Editar time</v-card-title>
                
                <v-card-text>
                    <v-text-field label="Nome do time" v-model="team.name" @input="team.name=fixedTeamName"/>
                    <v-text-field 
                    label="Adicionar membro" 
                    v-model='newTeamUser'
                    append-icon="add_circle_outline" 
                    @click:append="addUser(newTeamUser); newTeamUser = ''">
                    </v-text-field>
                    <v-list v-for="user in users" :key="user">
                            <v-divider></v-divider>
                            <v-list-item>
                                <span>{{user}}</span>
                                <v-spacer></v-spacer>
                                <v-icon v-if="user !== team.admin" @click="userDelete = user; dialogDelete = true">highlight_off</v-icon>
                            </v-list-item>
                        </v-list>

                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-2" text @click="team.users = users.slice();addTeam(team);dialogEdit = false">Salvar</v-btn>
                <v-btn color="red" text @click="dialogEdit = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <!-- USER DELETE CONFIRMATION DIALOG -->
        <v-dialog v-model="dialogDelete" width="500">
            <v-card>
            <v-card-title class="headline green lighten-2" primary-title>Remover participante</v-card-title>
    
            <v-card-text class="subtitle-1">Deseja remover "{{ userDelete }}" do time "<b>{{team.name}}</b>" ?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" text @click="removeUser(user)">Deletar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-2" text @click="dialogDelete = false">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar multi-line timeout=3000 v-model="snackbarDelete">
            "{{ userDelete }}" foi removido de {{team.name}}
            <br>
            Clique em "Salvar" para salvar as mudanças
        </v-snackbar>
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
        team: {
            id: "",
            name: "",
            admin: "",
            users: [],
        },
        teams: [],
        users: [],
        headers: [
          { text: 'Nome do time', value: 'name'},
          { text: 'Administrador', value: 'admin'},
          { text: 'Número de Participantes', value: 'users.length'},
          { text: 'Ações', value: 'actions'},
        ],
        dialogEdit: false,
        dialogDelete: false,
        snackbarDelete: false,
        newTeamUser:'',
        userDelete:'',
        loading:false,
      }
    },
    methods:{
        a(){
            alert(this.newTeamUser);
        },
        getTeams() {
            this.loading = true;
                let res = api.findAllTeam().then(data => {
                this.teams = data;
                this.loading = false;
            });
        },
        addUser(user) {
            this.users.push(user);
        },
        removeUser(user){
          let userIndex = this.users.indexOf(user);
          this.users.splice(userIndex, 1);
          this.dialogDelete = false;
          this.snackbarDelete = true;
        },
        getTeam(team){
            this.team.admin = team.admin;
            this.team.createdAt = team.createdAt;
            this.team.id = team.id;
            this.team.name = team.name;
            this.users = team.users.slice();
        },
        async addTeam(team){
            let res = await api.saveTeam(team).then(data => {
              if (data.status == '200') {
                  console.log('foi');
                  this.getTeams()
              }else{
                console.log(data)
              }
            })
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
        },
        fixedTeamName(){
            return this.team.name.split(' ').join('-');
        },
    },
}
</script>