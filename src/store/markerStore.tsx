import axios from "axios";
import { makeAutoObservable } from "mobx";
import { Marker } from "../utils/modals";
import systemStore from "./systemStore";

async function getSystemMarkers(){
  const uid=systemStore.currentSystem?._id;
  try{
    debugger;
  const res=await axios.get(`http://localhost:3333/marker?systemId=${uid}`)
  // if (res.data.length<1) {
  //   const markers :Marker[] = [];
  //   return markers;
  // }
    return res.data;
  }catch (error) {
    console.log(error);
  }
}
class Store {
  addresses: any={};
  markers: Marker[] =[];
  currentMarker: Marker ={
  lat:0,
  lng:0,
  name:'string' ,
  address:"string",
  city:"string",
  _id:"string" 
  };

 constructor() {
    makeAutoObservable(this);
    this.initMarkers();
    // async function get(){
    //   const markers:Marker[]=await 
    //   this.markers=markers;
    // }
  }

  async initMarkers(){
    this.markers=await getSystemMarkers();
  }

 addMarker(marker: Marker) {
  debugger
    this.markers.push(marker);
  }
  addAdresses(adress: any) {
    debugger
      this.addresses=adress;
    }
    // getAdresses() {
    //   debugger
    //     return this.adresses;
    //   }
  // async SearchMarker(name: string) {
  //     this.currentMarker = this.markers.find((marker) => marker.name === name) || null;
  // }
}
const markerStore = new Store();
export default markerStore;
