import axios from 'axios'

const instance = axios.create({
    baseURL: `https://swizi-messenger.herokuapp.com/`
});

export default instance;
