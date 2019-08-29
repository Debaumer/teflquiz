import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cc-tefl.firebaseio.com/'
});

export default instance;
