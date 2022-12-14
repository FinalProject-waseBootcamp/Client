import { System } from "../utils/modals";
import { makeAutoObservable } from "mobx";
import { getByAdminId, postSystem} from "../api/system";
import userStore from "./userStore";

const addSystem = async (system: System) => {
  try {
    const res = await postSystem(system);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getSystems = async (managerId: string) => {
  try {
    const systemList = await getByAdminId(managerId);
    debugger
    return systemList;
  } catch (error) {
    console.log(error);
  }
};

class Store {
  systems: System[] = [];
  currentSystem:System |null= null;

  constructor() {
    makeAutoObservable(this);
    this.loadSystems();
  }
  
  async loadSystems() {
    debugger
    this.systems = await getSystems(userStore.user.uid) as System[];
  }

  async addSystem(system: System) {
    await addSystem(system);
    this.systems.push(system);
    console.log(this.systems);
  }
}
const systemStore = new Store();
export default systemStore;
