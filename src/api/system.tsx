import { async } from '@firebase/util';
import axios from 'axios';
import{System as Isystem} from '../utils/modals'

export const get = async () => {
    try {
        const response= await axios.get('https://bold-hope-360316.el.r.appspot.com/system');
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
        console.log('error in get all systems', error);
    }
}
export const getById = async (systemId: string) => {
    try {
        const response = await axios.get(`https://bold-hope-360316.el.r.appspot.com/system/${systemId}`);
        return response.data;
    } catch (error) {
        console.log('error in get system', error);
    }
}

export const getByAdminId = async (adminId: string) => {
    try {
        const response = await axios.get(`https://bold-hope-360316.el.r.appspot.com/system?adminId=${adminId}`);
        return response.data;
    } catch (error) {
        console.log('error in get manager systems', error);
    }
}
export const postSystem=async(newSystem:Isystem)=>{
    try{
        debugger;
        console.log(newSystem);
        const response= await axios.post('https://bold-hope-360316.el.r.appspot.com/system',newSystem);
        return response.data;
    }catch(error){
        console.log('error in create system', error);
    }

}
export const put=async(uid : string ,updatedSystem:Isystem)=>{
    try {
        const res =await axios.put(`https://bold-hope-360316.el.r.appspot.com/system/${uid}`, updatedSystem);
        return res.status;
      } catch (err) {
        console.log(err);
      }
    
    }