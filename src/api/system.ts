import axios from 'axios';
import { stringify } from 'querystring';
import{System as Isystem} from '../utils/modals'

export const get = async () => {
    try {
        const response= await axios.get('http://localhost:3333/system');
        const systemssList:Isystem[]=await response.data.map((system:Isystem)=>{
            return{
                uid:system.uid,
                adminId:system.adminId,
                topic: system.topic,
                name:system.name,
                description:system.description,
                communicationDetails:system.communicationDetails,
            }
        })
        return systemssList;
    }
    catch (error) {
        console.log('error in get business', error);
    }
}