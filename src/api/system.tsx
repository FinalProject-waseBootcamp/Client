import { async } from '@firebase/util';
import axios from 'axios';
import { stringify } from 'querystring';
import{System as Isystem} from '../utils/modals'

export const get = async () => {
    try {
        const response= await axios.get('http://localhost:3333/system');
        const systemssList:Isystem[]=await response.data.map((system:Isystem)=>{
            return{
                _id:system._id,
                adminId:system.adminId,
                topic: system.topic,
                name:system.name,
                description:system.description,
                communicationDetails:system.communicationDetails,
            }
        })
        return systemssList;
    }catch (error) {
        console.log('error in get systems', error);
    }
}
export const getById = async (systemId: string) => {
    try {
        const Request = await axios.get(`http://localhost:3333/request?id=${systemId}`);
        return Request;
    } catch (error) {
        console.log('error in get systems', error);
    }
}
export const post=async(newSystem:Isystem)=>{
    try{
        debugger;
        console.log(newSystem);
        const response= await axios.post('http://localhost:3333/system',newSystem);
        return response.data;
    }catch(error){
        console.log('error in create system', error);
    }

}
export const put=async(uid : string ,updatedSystem:Isystem)=>{
    try {
        const res =await axios.put(`http://localhost:3333/system/${uid}`, updatedSystem);
        return res.status;
      } catch (err) {
        console.log(err);
      }
    
    }