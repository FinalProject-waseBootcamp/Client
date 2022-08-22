import { Roles, User } from '../utils/modals';
// import  makeAutoObservable  from 'mobx';
import {makeAutoObservable} from 'mobx';
import axios from 'axios';

  // "mobx": "^6.6.1"
    // // "mobx-react": "^7.5.2",
    // // "mobx-react-lite": "^3.4.0"

async function addUser(userToSave: User) {
    try {
        const res = await axios.post(`http://localhost:3333/user`, userToSave);
        let user = await res.data;
        return user;
    }
    catch (error) { console.log(error); }
}
const getUser=async(id:string)=>{
    debugger
    try{
       const res = await axios.get(`http://localhost:3333/user/${id}`);   
       let user = await res.data;
       return user;
    }
    catch(error) { console.log(error); }
}
   

class Store{
    user:any;
    // :User={
    //     uid: '',
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: '',
    //     role:Roles.MAIN_ADMIN,
    //     phone: ''
    // };
    
    async addUser(user:User){
        await addUser(user);
        this.user=user;
        console.log(this.user)
    }
    async getUser(id:string){
       const user:User= await getUser(id);
        this.user=user;
        console.log(user)
      return user 
    }

    constructor(){
        makeAutoObservable(this);
    }
}

const userStore = new Store();

export default userStore ;