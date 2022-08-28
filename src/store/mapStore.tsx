import { makeAutoObservable } from "mobx";
import { Marker, Position } from "../utils/modals";
class Store {
center:Position={lat:0, lng:0}
currentAddress={lat:0, lng:0,address:"string"}
  constructor() {
    makeAutoObservable(this);
  }
}
const mapStore = new Store();
export default mapStore;
