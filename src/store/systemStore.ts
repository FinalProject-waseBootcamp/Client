import { User } from '../utils/modals';
import  {makeAutoObservable}  from 'mobx';
import axios from 'axios';

  // "mobx": "^6.6.1"
    // // "mobx-react": "^7.5.2",
    // // "mobx-react-lite": "^3.4.0"

async function addUser(userToSave: User) {
    try {
        const res = await axios.post(`http://localhost:3333/user/create`, userToSave);
        let userList = await res.data;
        return userList;
    }
    catch (error) { console.log(error); }
}
const getUser=async(id:string)=>{
    debugger
    try{
       const res = await axios.get(`http://localhost:3333/findOne?${id}`);   
       let user = await res.data;
       return user;
    }
    catch(error) { console.log(error); }
}
   

class Store{
    user:any=[];

    
    async addUser(user:User){
        await addUser(user);
        this.user=user;
        console.log(this.user)
    }
    async getUser(id:string){
       const user= await getUser(id);
        this.user=user;
        console.log(user)
      return user
      
    }

    constructor(){
        makeAutoObservable(this);
    }
}

const systemStore = new Store();

export default systemStore ;
export{}