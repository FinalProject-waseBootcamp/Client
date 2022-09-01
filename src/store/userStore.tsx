import {  User } from '../utils/modals';
import {makeAutoObservable} from 'mobx';
import { getAuth } from 'firebase/auth';

interface FireBaseUser{

}
class Store{
    user:any;
    // user:FireBaseUser;
   
    async setUser(user:any){
        this.user=user;
        console.log(this.user)
    }
    async logOut(){
        this.user=null;
    }
    constructor(){
        makeAutoObservable(this);
        let auth = getAuth();
        let user = auth.currentUser;
        this.user = user;
    }
}

const userStore = new Store();

export default userStore ;