import { async } from '@firebase/util';
import axios from 'axios';
import { Marker } from '../utils/modals'


export const post = async (newMarker: Marker) => {
    debugger;
    try {
        const response = await axios.post('https://bold-hope-360316.el.r.appspot.com/marker', newMarker);
        return response.data;
    } catch (error) {
        console.log('error in create newMarker', error);
    }

}

export const getAllMarkers = async () => {
    try {
        const response = await axios.get('https://bold-hope-360316.el.r.appspot.com/marker');
        const MarkersList: Marker[] = await response.data.map((marker: Marker) => {
            return {
                managerId: marker.managerId,
                systemId: marker.systemId,
                lat: marker.lat,
                lng: marker.lng,
                name: marker.name,
                description: marker.description,
                address: marker.address,
                color: marker.color,
                notes: marker.notes,
                email: marker.email,
                phone: marker.phone,
            }
        })
        return MarkersList;
    } catch (error) {
        console.log('error in get systems', error);
    }
}
export const getMarker = async (markerId: string) => {
    try {
        const Marker = await axios.get(`https://bold-hope-360316.el.r.appspot.com/marker?id=${markerId}`);
        return Marker;
    } catch (error) {
        console.log('error in get systems', error);
    }
}

export const putMarker = async (markerId: string, updatedMarker: Marker) => {
    try {
        await axios.put(`https://bold-hope-360316.el.r.appspot.com/marker?id=${markerId}`, updatedMarker);
    } catch (err) {
        console.log(err);
    }
}

export const deleteM = async (markerId: string) => {
    try {
        debugger
       const res= await axios.delete(`https://bold-hope-360316.el.r.appspot.com/marker/${markerId}`);
        return res.status;
    } catch (err) {
        console.log(err);
    }
}