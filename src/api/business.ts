import axios from 'axios';
import{Business as IBusiness} from '../utils/modals'

export const get = async () => {
    try {
        const response= await axios.get('http://localhost:3333/business');
        const businessList:IBusiness[]=await response.data.map((busines:IBusiness)=>{
            return{
                adminId:busines.adminId,
                name:busines.name,
                description:busines.description
            }
        })
        return businessList;
    }
    catch (error) {
        console.log('error in get business', error);
    }
}