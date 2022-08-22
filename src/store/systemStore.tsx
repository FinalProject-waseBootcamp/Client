import { System, User } from '../utils/modals';
// @ts-ignore
import  {makeAutoObservable}  from 'mobx';
// import {observable, action, computed, makeObservable} from "mobx";
import axios from 'axios';
import userStore from './userStore';


const addSystem=async(system:System)=>{
    try {     
        const res = await axios.post(`http://localhost:3333/system`,system);
        const data = await res.data;
        console.log(data);
        return data;
    } 
    catch (error) { console.log(error); }
}

const getSystems=async(managerId:string)=>{
    try {
        const res = await axios.get(`http://localhost:3333/system?adminId=${managerId}`);
        let systemsList = await res.data;
        return systemsList;
    } catch (error) { console.log(error); }
}

class Store{
    systems:System[]=[];
    user:User=

async loadSystems(){
    debugger;
    this.systems = await getSystems(this.user._id);
}

async addSystem(system:System){
    await addSystem(system);
    this.systems.push(system);
    console.log(this.systems)
}
constructor(){
    makeAutoObservable(this);
}

}
const systemStore = new Store();

export default systemStore ;


