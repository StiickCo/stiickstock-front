<template>
    <v-card style="width: 100%; height: auto; padding: 1rem">
        <form>
            <!-- <v-text-field label="Nome do time" v-model="team.name"/>
            <v-text-field label="Administrador" v-model="team.admin"/>
                        <v-text-field label="Participantes do Time" v-model="user.name"/>
                        <v-btn @click="addTeam(team)">Criar Time</v-btn> -->

                <v-card-title class="headline"><v-spacer></v-spacer> Criar novo time <v-spacer></v-spacer> </v-card-title>
                <v-card-text class="subtitle-1" >
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex ml-3 xs2 align-self-center>
                    <b>Dono do time:</b>
                    </v-flex>
                    <v-flex xs9>
                       <v-list two-line>
                           <v-list-item>
                               <v-list-item-avatar size=50>
                                   <v-img :src="`${user.picture}`"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content class="headline">
                                    <v-list-item-title >{{user.nickname}}</v-list-item-title>
                                    <v-list-item-subtitle >{{user.name}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list> 
                        <!-- <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title> 
                                     <v-avatar><v-img :src="`${user.picture}`"></v-img></v-avatar>  {{ user.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item> -->
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <v-layout row mt-3>
                    <v-flex ml-3 xs2 align-self-center>
                    <b>Nome do time:</b>
                    </v-flex>
                    <v-flex xs9>
                        <v-text-field label="Nome do time" v-model="teamName" @input="team.name=fixedTeamName; a()"/>
                        <span>Seu time será registrado como: <b>{{fixedTeamName}}</b></span>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <v-layout row mt-3>
                    <v-flex ml-3 xs2 align-self-start>
                    <b>Participantes do time:</b>
                    </v-flex>

                    <v-flex xs9>
                        <v-text-field label="Participantes do Time" v-model="newTeamUser" append-icon="add_circle_outline" @click:append="addUser()"/>
                        <v-list align-self-center v-for="user in team.users" :key="user">
                            <v-divider></v-divider>
                            <v-list-item>
                                <span>{{user}}</span>
                            </v-list-item>
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" dark to="/teams">Voltar</v-btn>
                </v-card-actions>
        </form>
    </v-card>
</template>
<script>
import { APIService } from "../resources/api";
const api = new APIService();
export default {
    name: "AddTeams",
    mounted () {
        this.getuserData();
        this.addUser(this.user.name);
    },
    data () {
      return {
          teamName:"",
          user:[],
          newTeamUser:"",
        team: {
            name: "",
            admin: "",
            users: [],
            createdAt: "123123",
        },
      }
    },
    methods:{   
        async addTeam(team){
            this.addUser(this.user)
            let res = await api.saveTeam(team).then(data => {
              if (data.status == '200') {
                  console.log('foi');
              }
            })
        },
        addUser(user) {
            console.log(user);
            this.team.users.push(user);
        },
        getuserData(){
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    },
    computed:{
        fixedTeamName(){
            return this.teamName.split(' ').join('-');
        }
    }
}
</script>