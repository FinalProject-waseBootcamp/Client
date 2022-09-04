import axios from 'axios';
import { Manager } from '../utils/modals'


export const postManager = async (newManager: Manager) => {
    try {
        const response = await axios.post('http://localhost:3333/manager', newManager);
        return response.data;
    } catch (error) {
        console.log('error in create newManager', error);
    }

}

export const getAllManagers = async () => {
    try {
        const response = await axios.get('http://localhost:3333/manager');
        const ManagersList: Manager[] = await response.data.map((manager: Manager) => {
            return {
                user_id: manager.user_id,
                systemId: manager.systemId,
                active: manager.active,
                display_name: manager.display_name,
                role: manager.role,
                invitation_sent: manager.invitation_sent
            }
        })
        return ManagersList;
    } catch (error) {
        console.log('error in get systems', error);
    }
}
export const getByIds = async (managerId: string,systemId :string)=> {
    try {
        debugger
        const Manager = await axios.get(`http://localhost:3333/manager/1?mId=${managerId}&sId=${systemId}`);
        return Manager.data;
    } catch (error) {
        console.log('error in get Manager', error);
    }
}

export const putManager = async (managerId: string, updatedManager: Manager) => {
    try {
        await axios.put(`http://localhost:3333/system/manager/${managerId}`, updatedManager);
    } catch (err) {
        console.log(err);
    }
}

export const deleteManager = async (managerId: string) => {
    try {
        await axios.delete(`http://localhost:3333/system/manager/${managerId}`);
    } catch (err) {
        console.log(err);
    }
}