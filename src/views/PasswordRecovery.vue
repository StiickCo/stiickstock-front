<template>
  <v-form id="formLogin" @submit="forgotPassword"  v-model="valid">
    <div class="text-xs-center">
      <v-layout pa-2>
        <v-flex>
          <div class="cabecalho animated fadeIn delay-0.5s mt-6">
          </div>
          <v-layout justify-center class="subHeaderCabecalho animated fadeIn delay-0.5s">
          </v-layout>
          <v-snackbar :timeout='snackbar.timeout' :color="snackbar.color" v-model="snackbar.show">
            {{ snackbar.text }}
            <v-btn
              color="white"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>

          <v-layout align-center justify-center row>
            <v-flex xs10 lg3 class="px-4 margin-to-top animated fadeInLeft delay-0.5s">
              <span id="stiick" class="header font-weight-medium">Stiick</span><span id="stock" class="header font-weight-thin">Stock</span>
              <v-text-field
                outlined
                label="Email"
                color="#004B8B"
                v-model="email"
                prepend-inner-icon="mail"
                clearable
                :rules="[rules.required]"
              />
            </v-flex>
          </v-layout>

         
          <v-layout justify-center row>
            <v-btn color="#004B8B" type="submit" outlined class="animated fadeIn delay-0.5s">Enviar</v-btn>
          </v-layout>

          <v-layout justify-center row mt-4 class="animated fadeIn delay-0.5s">
            <a class="mr-2" href="/">Fazer Login</a>  | 
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
    limparForm() {
      this.password = "";
    },
    forgotPassword(e) {
      e.preventDefault()
      this.$auth.forgotPassword(this.email, (err, resp) => {
        if(err) {
          this.snackbar.show = true;  
          this.snackbar.text = 'Ocorreu um erro, por favor tente novamente mais tarde.';
          this.snackbar.color = "red";
          console.log('Error', err);
        } else {
          this.snackbar.show = true;
          this.snackbar.text = 'Um e-mail foi enviado para sua caixa de mensagem.';
          this.snackbar.color = "green";
        }
      })
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
      email: "",
      password: "",
      loading: false,
      rules: {
        required: value => !!value || "Campo Obrigatorio",
        min: v => (v && v.length >= 8) || "Minimo de 8 caracteres"
      }
    };
  }
};
</script>

<style>
.cabecalho {
  font-size: 50px;
  margin-top: 150px;
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
</style>
