import { makeAutoObservable } from "mobx";
import { Marker } from "../utils/modals";
class Store {
  markers: Marker[] = [];
  currentMarker: Marker | null = {
    lat: 0,
    lng: 0,
    name: "",
    address: "",
  };
  constructor() {
    makeAutoObservable(this);
    this.markers.push(
      {
        lat: 32.0461,
        lng: 35.5166,
        name: "S.T.",
        address: "adress",
        color: "blue",
      },
      {
        lat: 34,
        lng: 32,
        name: "Noga",
        address: "adress",
        color: "red",
      },
      {
        lat: 33,
        lng: 32,
        name: "Moshe",
        color: "orange",
        address: "adress",
      },
      {
        lat: 32,
        lng: 32,
        name: "ora",
        color: "green",
        address: "adress",
      }
    );
  }
  addMarker(marker: Marker) {
    debugger;
    this.markers.push(marker);
    debugger;
  }
  async SearchMarker(name: string) {
    debugger
      this.currentMarker = this.markers.find((m) => m.name === name) || null;
  }
}
const markerStore = new Store();
export default markerStore;
