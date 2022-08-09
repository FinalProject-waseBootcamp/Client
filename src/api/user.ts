import axios from 'axios';
import{User as Iuser} from '../utils/modals'

export const get = async () => {
    try {
        const response= await axios.get('http://localhost:3333/user');
        const usersList:Iuser[]=await response.data.map((user:Iuser)=>{
            return{
                uid:user.uid,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                phone: user.phone,
            }
        })
        return usersList;
    }
    catch (error) {
        console.log('error in get users', error);
    }
}

