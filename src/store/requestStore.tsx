import { makeAutoObservable } from "mobx";

class Store {
    currentRequest: any = null;
    currentRequestAddressesName: string = "";
    request: Request[] = [];
    robot:boolean=false;
    constructor() {
        makeAutoObservable(this);
    }
    
}

const requestStore = new Store();
export default requestStore;