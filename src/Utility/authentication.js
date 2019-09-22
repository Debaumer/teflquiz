import axios from 'axios';

const authInstance = axios.create({
  baseURL:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_M3vdOf4elHSHpBnVxO6D0vpEIN5wM0U'
});

export default authInstance;
