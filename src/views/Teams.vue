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

            <!-- ACTIONS -->
            <template v-slot:item.actions="{ item }">
                <v-btn icon :to="`/team/info/${item.id}`"> <v-icon color="blue darken-1">info</v-icon> </v-btn>
                <v-btn icon @click="getTeam(item); dialogEdit = true;"> <v-icon>edit</v-icon> </v-btn>
                <v-btn icon @click="getTeam(item); dialogDelete = true"> <v-icon color="red lighten-1 "> delete</v-icon> </v-btn>
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
                                <v-icon v-if="user !== team.admin" @click="userDelete = user; dialogUserRemove = true">highlight_off</v-icon>
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
        
        <!-- USER REMOVE CONFIRMATION DIALOG -->
        <v-dialog v-model="dialogUserRemove" width="500">
            <v-card>
            <v-card-title class="headline green lighten-2" primary-title>Remover participante</v-card-title>
    
            <v-card-text class="subtitle-1">Deseja remover "{{ userDelete }}" do time "<b>{{team.name}}</b>" ?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" text @click="removeUser(user)">Deletar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-2" text @click="dialogUserRemove = false">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- TEAM DELETE DIALOG -->
        <v-dialog v-model="dialogDelete" width="500">
            <v-card>
            <v-card-title class="headline green lighten-2" primary-title>Excluir time</v-card-title>
    
            <v-card-text class="subtitle-1">
                Tem certeza que deseja excluir o time "<b>{{team.name}}</b>" ?
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" text @click="removeTeam(team)">Deletar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-2" text @click="dialogDelete = false">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- SNACKBARS -->
        
        <!-- USER REMOVE -->
        <v-snackbar :timeout="snackbar.timeout" :color="snackbar.color" v-model="snackbarUserRemove">
            "{{ userDelete }}" foi removido de {{team.name}}
            <br>
            Clique em "Salvar" para salvar as mudanças
        </v-snackbar>
        
        <v-snackbar :timeout='snackbar.timeout' :color="snackbar.color" v-model="snackbar.show">
            {{ snackbar.text }}
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
          { text: 'Ações', value: 'actions', sortable:false},
        ],
        dialogEdit: false,
        dialogDelete: false,
        dialogUserRemove: false,
        snackbarUserRemove:false,
        snackbar:{
            show:false,
            timeout:3000,
            text:'',
            color:''
        },
        newTeamUser:'',
        userDelete:'',
        loading:false,
        products:[],
      }
    },
    methods:{
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
          this.dialogUserRemove = false;
          this.snackbarUserRemove = true;
          this.snackbar.color = "green";
          
        },
        getTeam(team){
            this.team.admin = team.admin;
            this.team.createdAt = team.createdAt;
            this.team.id = team.id;
            this.team.name = team.name;
            this.team.users = team.users.slice();
            this.users = team.users.slice();
            this.getProducts();
        },
        async addTeam(team){
            let res = await api.saveTeam(team).then(data => {
              if (data.status == '200') {
                  this.snackbar.show = true;
                  this.snackbar.text = "Mudanças salvas com sucesso!"
                  this.snackbar.color = "green";
                  this.changeProductTeam(team.name);
                  this.getTeams();
              }else{
                this.snackbar.show = true;
                this.snackbar.text = "Ocorreu um erro, por favor tente novamente mais tarde"
                this.snackbar.color = "red";
              }
            })
        },
        getProducts() {
          let res = api.findAllProduct().then(data => {
            this.products=[];
            for (let i = 0; i < data.length; i++) {
                    if ((data[i].teamOwner == this.team.name)){
                        this.products.push(data[i]);    
                    }                
            }
            console.log(this.products);
        });
        },
        changeProductTeam(newTeam){
            for (let i = 0; i < this.products.length; i++) {
                this.products[i].teamOwner = newTeam;
                this.addProduct(this.products[i]);
            }
        },
        async addProduct(item){
            let res = await api.saveProduct(item).then(data => {
                console.log(data);
                return data.status;
            })
        },
        async removeTeam(team) {
          let res = await api.deleteTeam(team).then(data => {
            if (data.status == 200) {
                this.snackbar.show = true;
                this.snackbar.text = "Time deletado com sucesso!"
                this.snackbar.color = "green";
                this.changeProductTeam("");
                this.getTeams();
            }
          })
            this.dialogDelete = false;
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
        fixedTeamName(){
            return this.team.name.split(' ').join('-');
        },
    },
}
</script>