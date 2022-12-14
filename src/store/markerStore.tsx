import axios from "axios";
import { makeAutoObservable } from "mobx";
import { Marker } from "../utils/modals";
import systemStore from "./systemStore";

async function getSystemMarkers() {
  const uid = systemStore.currentSystem?._id;
  try {
    debugger;
    const res = await axios.get(`https://bold-hope-360316.el.r.appspot.com/marker?systemId=${uid}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
interface IAddress{
  address:string;
  lat:number;
  lng:number;
}
class Store {
  address: IAddress |null= null;
  markers: Marker[] = [];
  currentMarker: Marker|null = null;

  constructor() {
    makeAutoObservable(this);
    this.initMarkers();
  }

  async initMarkers() {
    this.markers = await getSystemMarkers();
  }

  addMarker(marker: Marker) {
    debugger;
    this.markers.push(marker);
  }
  addAdress(adress: any) {
    this.address = adress;
  }

  // async SearchMarker(name: string) {
  //     this.currentMarker = this.markers.find((marker) => marker.name === name) || null;
  // }
}
const markerStore = new Store();
export default markerStore;
