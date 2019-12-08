import auth0 from 'auth0-js';
import Vue from 'vue';

let URL = 'http://lll.surge.sh';
if (location.href.indexOf('localhost') > -1) {
  URL = 'http://localhost:3000';
}

// exchange the object with your own from the setup step above.
const webAuth = new auth0.WebAuth({
  domain: 'dev-gzy6720b.auth0.com',
  clientID: 'MQHD4O2SDHVZmLHSefM72GBVCNoYid3H',
  // make sure this line is contains the port: 8080
  redirectUri: `${URL}/callback`,
  // we will use the api/v2/ to access the user information as payload
  audience: 'https://dev-gzy6720b.auth0.com/api/v2/',
  responseType: 'token id_token',
  scope: 'openid profile', // define the scopes you want to use
});

const auth = new Vue({
  computed: {
    token: {
      get() {
        return localStorage.getItem('id_token');
      },
      set(id_token) {
        localStorage.setItem('id_token', id_token);
      },
    },
    accessToken: {
      get() {
        return localStorage.getItem('access_token');
      },
      set(accessToken) {
        localStorage.setItem('access_token', accessToken);
      },
    },
    expiresAt: {
      get() {
        return localStorage.getItem('expires_at');
      },
      set(expiresIn) {
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);
      },
    },
    user: {
      get() {
        return JSON.parse(localStorage.getItem('user'));
      },
      set(user) {
        localStorage.setItem('user', JSON.stringify(user));
      },
    },
  },
  methods: {
    

    login() {
      webAuth.authorize({
        redirectUri: `${URL}/callback`,
      }, (err, authResult) => {
        this.handleAuthentication(err, authResult);
      });
    },
    callback() {
      return webAuth.parseHash(this.handleAuthentication);
    },
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user');
        localStorage.removeItem('vuex');

        webAuth.logout({
          returnTo: URL,
          client_id: 'MQHD4O2SDHVZmLHSefM72GBVCNoYid3H',
        });
      });
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt;
    },
    handleAuthentication(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.expiresAt = authResult.expiresIn;
        this.accessToken = authResult.accessToken;
        this.token = authResult.idToken;
        webAuth.client.userInfo(
          authResult.accessToken,
          (err, user) => {
            this.user = user;
            location.href = location.href.replace(/callback.*/, '');
          },
        );
      } else if (err) {
        this.logout();
      }
    }
  },
})

export default {
  install(Vue) {
    Vue.prototype.$auth = auth;
  },
}
