<template>
  <div>
    <div v-if="loadingScreen" class="display-1 text-right">
      <span><v-icon color="black">fa-circle-notch fa-spin</v-icon> Carregando...</span>
    </div>

    <v-form v-if="!loadingScreen" class="mt-n6" id="formLogin" v-model="valid" @submit="login">
      <div class="text-xs-center" >
        <v-layout>
          <v-flex>
            <div class="cabecalho animated fadeIn delay-0.5s ">
             
            </div>
            <v-layout justify-center class="subHeaderCabecalho animated fadeIn delay-0.5s">
            </v-layout>
            

            <v-layout align-center justify-center row class="paddingLogin">
              <v-flex xs10 lg3 class="animated fadeInLeft delay-0.5s">
                <span id="stiick" class="header font-weight-medium">Stiick</span><span id="stock" class="header font-weight-thin">Stock</span> 
                <v-text-field
                  outlined
                  label="Email"
                  color="#004B8B"
                  v-model="user"
                  prepend-inner-icon="person"
                  clearable
                  @click:clear="limparForm"
                  :rules="[]"
                />
              </v-flex>
            </v-layout>

            <v-layout align-center justify-center row >
              <v-flex xs10 lg3 class="animated fadeInRight delay-0.5s">
                <v-text-field
                  outlined
                  v-model="password"
                  label="Senha"
                  color="#004B8B"
                  prepend-inner-icon="vpn_key"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  @click:append="show = !show"
                  :type="show ? 'text' : 'password'"
                  :rules="[]"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout justify-center row>
              <v-btn type="submit" @submit="login" :loading="loading" color="#004B8B" outlined class="animated fadeIn delay-0.5s">Entrar</v-btn>
            </v-layout>

            <v-layout justify-center row mt-4 class="animated fadeIn delay-1s">
              <a class="mr-2" href="/login/recovery">Esqueceu a senha?</a>  | 
              <a class="ml-2" href="/login/signup">Registrar-se</a>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-form>
    <v-snackbar 
      :timeout='snackbar.timeout' 
      :color="snackbar.color" 
      v-model="snackbar.show">
      {{ snackbar.text }}

        <v-btn
          color="white"
          text
          @click="snackbar = false">
          Close
        </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  methods: {
    limparForm(){
      this.password = ""
    },
    login(e) {
      e.preventDefault();
      if (this.loading || !this.valid) return;
      this.loading = true;
      this.$auth.newLogin(this.user, this.password, err => {
        if (err && err.code == "invalid_grant") {
          this.snackbar.color = "red";
          this.snackbar.text = "Usuário ou senha incorreto.";
          this.snackbar.show = true;
          console.log("Error", err);
        } else if (err) {
          this.snackbar.color = "red";
          this.snackbar.text = "Ocorreu um erro, por favor tente novamente mais tarde.";
          this.snackbar.show = true;
          console.log("Error", err);
        }else{
          this.snackbar.color = "green";
          this.snackbar.text = "Autenticado com sucesso";
          this.snackbar.show = true;
          this.loadingScreen = true;
          // setTimeout(() => this.loadingScreen = true, 1000);
        }
        this.loading = false;
      });
    }
  },

  
  data() {
    return {
      valid: null,
      snackbar:{
        show:false,
        timeout:3000,
        text:'',
        color:''
      },
      show: false,
      user: null,
      password: "",
      loading: false,
      loadingScreen: false,
      rules: {
        min: v => (v && v.length >= 8) || "Minimo de 8 caracteres"
      }
    };
  }
};
</script>

<style>
.paddingLogin{
  padding-top: 25vh;
}
</style>

<style scoped>
*{
  margin-top: 0px;
}
a {
  
  color: white;
}

.header{
    font-size: 3em;
}
</style>
