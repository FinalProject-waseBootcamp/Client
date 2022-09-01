import { makeAutoObservable } from "mobx";
import { Marker, Position } from "../utils/modals";
class Store {
  center: Position = { lat: 0, lng: 0 };
  zoom: number = 15;
  openInfo: boolean = false;
  currentAddress = { lat: 0, lng: 0, address: "string" };
  constructor() {
    makeAutoObservable(this);
  }
}
const mapStore = new Store();
export default mapStore;
