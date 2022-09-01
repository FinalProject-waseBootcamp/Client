import axios from 'axios';
import { Request } from '../utils/modals'


export const post = async (newRequest: Request) => {
    try {
        const response = await axios.post('http://localhost:3333/request', newRequest);
        return response.data;
    } catch (error) {
        console.log('error in create newRequest', error);
    }
}

export const getAllRequests = async () => {
    try {
        const response = await axios.get('http://localhost:3333/request');
        const RequestsList: Request[] = await response.data;
        // .map((requests: Request) => {
        //     return {
        //         firstName: requests.firstName,
        //         lastName: requests.lastName,
        //         email: requests.email,
        //         phone: requests.phone,
        //         system_id: requests.system_id,
        //         display_name: requests.display_name,
        //         status: requests.status,
        //         notes: requests.notes
        //     }
        // })
        return RequestsList;
    } catch (error) {
        console.log('error in get requests', error);
    }
}
export const getByIds = async (systemId: string) => {
    try {
        const Request = await axios.get(`http://localhost:3333/request?id=${systemId}`);
        return Request;
    } catch (error) {
        console.log('error in get systems', error);
    }
}

export const putRequest = async (requestId: string, updatedRequest: Request) => {
    try {
        await axios.put(`http://localhost:3333/system/request?id=${requestId}`, updatedRequest);
    } catch (err) {
        console.log(err);
    }
}

export const deleteRequest = async (requestId: string) => {
    try {
        await axios.delete(`http://localhost:3333/system/request?id=${requestId}`);
    } catch (err) {
        console.log(err);
    }
}