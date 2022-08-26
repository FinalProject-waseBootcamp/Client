import { makeAutoObservable } from "mobx";
import { Marker, Position } from "../utils/modals";
class Store {
center:Position={lat:0, lng:0}
  constructor() {
    makeAutoObservable(this);
  }
}
const mapStore = new Store();
export default mapStore;
