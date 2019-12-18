<template>
    <v-card style="width: 100%; height: 85vh; padding: 1rem">
        <form>
            <v-text-field label="Nome do time" v-model="team.name"/>
            <v-text-field label="Administrador" v-model="team.admin"/>
            <v-text-field label="Participantes do Time" v-model="user.name"/>
            <v-btn @click="addTeam(team)">Criar Time</v-btn>
        </form>
    </v-card>
</template>
<script>
import { APIService } from "../resources/api";
const api = new APIService();
export default {
    name: "AddTeams",
    mounted () {
    },
    data () {
      return {
        team: [{
            name: "",
            admin: "",
            users: [],
            createdAt: "123123",
        }],
        user: [{
            name: "",
            email: "gamer@gamer.com",
            createdAt: "12313213",
        }],
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
            this.team.users.push(this.user);
        }
    },
}
</script>