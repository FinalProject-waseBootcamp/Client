import axios from 'axios';

export const get = async () => {
    try {
        debugger
        return axios.get('http://localhost:3333/user');
    }
    catch (error) {
        console.log('error in get user', error);
    }

}