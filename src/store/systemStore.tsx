import { System } from "../utils/modals";
import { makeAutoObservable } from "mobx";
import {getById, post} from "../api/system";
import userStore from "./userStore";

const addSystem = async (system: System) => {
  try {
    const res = await post(system);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getSystems = async (managerId: string) => {
  try {
    const systemsList = await getById(managerId);
    return systemsList;
  } catch (error) {
    console.log(error);
  }
};

class Store {
  systems: System|any |null[] = [];
  currentSystem:System|any |null= null;

  async loadSystems() {
    debugger;
    this.systems = await getSystems(userStore.user.uid);
  }

  async addSystem(system: System) {
    await addSystem(system);
    this.systems.push(system);
    console.log(this.systems);
  }
  constructor() {
    makeAutoObservable(this);
  }
}
const systemStore = new Store();
export default systemStore;
