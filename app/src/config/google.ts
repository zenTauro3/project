const client_id = "64303496614-qts46aqj3g3pqj7hg3jpnkd9ovm9q4cf.apps.googleusercontent.com";
const callback = "http://localhost:5173/google";
const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${callback}&response_type=token&scope=openid%20profile%20email`;

export default url;