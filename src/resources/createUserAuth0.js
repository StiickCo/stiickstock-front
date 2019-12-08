import auth0 from 'auth0-js';

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

 
export class KontalkAuthService {
    constructor() {}


    signUp(user, password, cb) {
        webAuth.signup({
            connection: 'Username-Password-Authentication',
            email: user,
            'password': password
            //,user_metadata: { plan: 'silver', team_id: 'a111' }
        }, cb);
      }
}