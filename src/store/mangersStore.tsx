import { makeAutoObservable } from 'mobx';
import { getByIds, postManager } from '../api/managers';
import { Manager } from '../utils/modals';

class Store {

    currentManager: Manager|null = null;

    constructor() {
        makeAutoObservable(this);
    }
    async addManager(manager: Manager) {
        await postManager(manager);
        this.currentManager = manager;
    }

    async setManagerByUserIdAndSystemId(user_id: string, system_id: string) {
        debugger
        const manager=await getByIds(user_id, system_id) as Manager;
        this.currentManager = manager;
        return manager;
    }

}
const ManagerStore = new Store();
export default ManagerStore