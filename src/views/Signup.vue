<template>
  <v-form id="formLogin" v-model="valid" @submit="signUp">
    <div class="text-xs-center">
      <v-layout pa-2>
        <v-flex>
          <v-snackbar
            v-model="snackbar"
          >
            {{ text }}
            <v-btn
              color="white"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>

            <v-layout signUp align-center justify-center row>
            <v-flex xs10 lg3 class="px-4 margin-to-top animated fadeInLeft delay-0.5s">
              <span id="stiick" class="header font-weight-medium">Stiick</span><span id="stock" class="header font-weight-thin">Stock</span>
              <v-text-field
                outlined
                label="Nome Completo"
                color="#004B8B"
                v-model="user"
                prepend-inner-icon="person"
                clearable
                @click:clear="limparForm"
                :rules="[rules.required]"
              />
            </v-flex>
          </v-layout>

          <v-layout align-center justify-center row>
            <v-flex xs10 lg3 class="px-4 animated fadeInLeft delay-0.5s">
              <v-text-field
                outlined
                label="Email"
                color="#004B8B"
                v-model="email"
                prepend-inner-icon="mail"
                clearable
                @click:clear="limparForm"
                :rules="[rules.required]"
              />
            </v-flex>
          </v-layout>

          <v-layout align-center justify-center row>
            <v-flex xs10 lg3 class="px-4 animated fadeInRight delay-0.5s">
              <v-text-field
                outlined
                v-model="password"
                label="Senha"
                color="#004B8B"
                prepend-inner-icon="vpn_key"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
                :type="show ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout align-center justify-center row>
            <v-flex xs10 lg3 class="px-4 animated fadeInRight delay-0.5s">
              <v-text-field
                outlined
                v-model="repassword"
                label="Confirme sua Senha"
                color="#004B8B"
                prepend-inner-icon="vpn_key"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
                :type="show ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout justify-center row>
            <v-btn type="submit" color="#004B8B" outlined class="animated fadeIn delay-0.5s">Registrar</v-btn>
          </v-layout>

          <v-layout justify-center row mt-4 class="animated fadeIn delay-0.5s">
            <a class="mr-2" href="/login/recovery">Esqueceu a senha?</a>  | 
            <a class="ml-2" href="/">Já sou registrado</a>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </v-form>
</template>

<script>
import { APIService } from "../resources/api";
const api = new APIService();
export default {
  methods: {
    limparForm(){
      this.password = ""
      this.repassword = ""
    },
    async signUpOnBack() {
      let userToAdd = [{
        name: this.user,
        email: this.email,
        password: ''
      }]
      console.log(userToAdd[0])
      let res = await api.saveUser(userToAdd[0]).then(data => {
        if (data.status == '200') {
            console.log('User successfully saved');
        }
      })
    },
    signUp(e) {
      e.preventDefault();
      this.signUpOnBack();
      if (this.valid) {
        this.$auth.signUp(this.email, this.password, (err, resp) => {
          if (err && err.code == "invalid_signup") {
            this.color = "#fffff";
            this.text =
              "Usuário já existe, tente outro usuário ou realize o login.";
            this.snackbar = true;
            console.log("Error", err);
          } else if (err) {
            this.color = "#fffff";
            this.text =
              "Ocorreu um erro, por favor tente novamente mais tarde.";
            this.snackbar = true;
            console.log("Error", err);
          } else {
            this.color = "#fffff";
            this.text = "Usuário criado com sucesso!";
            this.snackbar = true;
            setTimeout(() => this.$router.push('/login'), 1000);
          }
        });
      }
    }
  },
  data() {
    return {
      loading: false,
      valid: null,
      user: "",
      snackbar: false,
      text: '',
      color: '',
      email: null,
      show: false,
      password: null,
      repassword: null,
      rules: {
        required: value => !!value || "Campo Obrigatorio",
        min: v => (v && v.length >= 8) || "Minimo de 8 caracteres",
        passwordMatches: v => v === this.password || "As senhas não conferem.",
        emailMatch: () => "The email s and password you entered don't match"
      }
    };
  }
};
</script>

<style>
.cabecalho {
  font-size: 50px;
  margin-top: 15vh;
  letter-spacing: 2px;
  width: 500px;
  height: 138;
  margin: auto;
}
.subHeaderCabecalho{
  font-size: 24px;
}
.snackBarTxt {
  color: #4a55c2 !important;
  caret-color: #4a55c2 !important;
}
.icon-cabecalho {
  font-size: 40px !important;
  padding-right: 4px;
  padding-bottom: 10px;
}
.margin-to-top {
  margin-top: 50px;
}
.margin-to-bottom {
  margin-top: 160px;
}
.overflow {
  overflow-y: hidden;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: transparent;
  -webkit-text-fill-color: white;
  box-shadow: 0 0 0px 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>

<style scoped>
a {
  color: white;
}

.header{
    font-size: 3em;
}

.signUp{
  margin-top: -3vh;
}
</style>
