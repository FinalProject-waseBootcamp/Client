import { async } from '@firebase/util';
import axios from 'axios';
import { stringify } from 'querystring';
import { Marker } from '../utils/modals'


export const post = async (newMarker: Marker) => {
    try {
        const response = await axios.post('http://localhost:3333/marker', newMarker);
        return response.data;
    } catch (error) {
        console.log('error in create newMarker', error);
    }

}

export const getAllMarkers = async () => {
    try {
        const response = await axios.get('http://localhost:3333/marker');
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
        const Marker = await axios.get(`http://localhost:3333/marker?id=${markerId}`);
        return Marker;
    } catch (error) {
        console.log('error in get systems', error);
    }
}

export const putMarker = async (markerId: string, updatedMarker: Marker) => {
    try {
        await axios.put(`http://localhost:3333/system/marker?id=${markerId}`, updatedMarker);
    } catch (err) {
        console.log(err);
    }
}

export const deleteMarker = async (markerId: string) => {
    try {
        await axios.delete(`http://localhost:3333/system/marker?id=${markerId}`);
    } catch (err) {
        console.log(err);
    }
}