import { makeAutoObservable } from 'mobx';
import {post,getByIds} from '../api/managers';
import { Managers } from '../utils/modals';

class Store {

    currentManager: any = null;


    constructor() {
        makeAutoObservable(this);
    }
    async addManager(manager: Managers) {
        await post(manager);
    }

    async getManagersByUserIdAndSystemId(user_id: string, system_id: string) {
        this.currentManager = await getByIds(user_id, system_id)
    }

}
const ManagerStore = new Store();
export default ManagerStore