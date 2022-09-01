import { makeAutoObservable } from 'mobx';
import { postManager } from '../api/managers';
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

    // async getManagersByUserIdAndSystemId(user_id: string, system_id: string) {
    //     this.currentManager = await getByIds(user_id, system_id)
    // }

}
const ManagerStore = new Store();
export default ManagerStore