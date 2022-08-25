import { makeAutoObservable } from "mobx";
import { Marker } from "../utils/modals";
class Store {
  markers: Marker[] = [];
  constructor() {
    makeAutoObservable(this);
    this.markers.push(
      {
        lat: 32.0461,
        lng: 35.5166,
        name: "S.T.",
        color: "blue",
      },
      {
        lat: 34,
        lng: 32,
        name: "o",
        color: "red",
      },
      {
        lat: 33,
        lng: 32,
        name: "r",
        color: "orange",
      },
      {
        lat: 32,
        lng: 32,
        name: "a",
        color: "green",
      }
    );
  }
}
const markerStore = new Store();
export default markerStore;
