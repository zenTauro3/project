const client_id = import.meta.env.VITE_GOOGLE_CLIENT;
const callback = "http://localhost:5173/google";
const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${callback}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&state=contraseña`;

export default url;