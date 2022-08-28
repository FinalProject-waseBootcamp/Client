import {  User } from '../utils/modals';
import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

 
// async function addUser(userToSave: User) {
//     try {
//         const res = await axios.post(`http://localhost:3333/user`, userToSave);
//         let user = await res.data;
//         return user;
//     }
//     catch (error) { console.log(error); }
// }
// const getUser=async(id:string)=>{
//     debugger
//     try{
//        const res = await axios.get(`http://localhost:3333/user/${id}`);   
//        let user = await res.data;
//        return user;
//     }
//     catch(error) { console.log(error); }
// }
   

class Store{
    user:any;
   
    async addUser(user:any){
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