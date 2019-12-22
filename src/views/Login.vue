<template>
  <v-form id="formLogin" v-model="valid" @submit="login">
    <div class="text-xs-center">
      <v-layout pa-2>
        <v-flex>
          <div class="cabecalho animated fadeIn delay-0.5s mt-6">
           
          </div>
          <v-layout justify-center class="subHeaderCabecalho animated fadeIn delay-0.5s">
          </v-layout>
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

          <v-layout align-center justify-center row>
            <v-flex xs10 lg3 class="px-4 margin-to-top animated fadeInLeft delay-0.5s" :style="padding">
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
          this.color = "#ffffff";
          this.text = "Usuário ou senha incorreto.";
          this.snackbar = true;
          console.log("Error", err);
        } else if (err) {
          this.color = "#ffffff";
          this.text = "Ocorreu um erro, por favor tente novamente mais tarde.";
          this.snackbar = true;
          console.log("Error", err);
        }
        this.loading = false;
      });
    }
  },

  
  data() {
    return {
      padding:{'padding-top':'4vh'},
      valid: null,
      snackbar: false,
      text: "",
      color: "",
      show: false,
      user: null,
      password: "",
      loading: false,
      rules: {
        min: v => (v && v.length >= 8) || "Minimo de 8 caracteres"
      }
    };
  }
};
</script>


<style>

</style>

<style scoped>
a {
  
  color: white;
}
</style>
