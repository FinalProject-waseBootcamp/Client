import { makeAutoObservable } from "mobx";
import { Marker } from "../utils/modals";
class Store {
    markers:Marker[] = []; 
   constructor() {
        makeAutoObservable(this);
        this.markers.push({
            lat: 32.0461,
            lng: 35.5166,
            name: "S.T.",
            color: "blue",
        })
      }
}
const markerStore = new Store();
export default markerStore;
