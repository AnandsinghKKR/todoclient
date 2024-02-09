import axios from 'axios'
import { CREATE_TODO, DELETE_TODO, LOGIN, MARK_TODO, REGISTER, TODO_LIST } from './apiConstants.js'

export const login =async (data)=>{
    return axios.post(LOGIN,data);
}

export const register =async (data)=>{
    return axios.post(REGISTER,data);
}

export const createTodoApi =async (data)=>{
    let token=getToken();
    console.log("Token : " ,token);
    return axios.post(CREATE_TODO,data,{
        headers:{auth:token}
    });
}

export const deleteTodoApi =async (data)=>{
    let token=getToken();
    console.log("Token : " ,token);
    return axios.post(DELETE_TODO,data,{
        headers:{auth:token}
    });
}


export const MarkTodoApi =async (data)=>{
    let token=getToken();
    return axios.post(MARK_TODO,data,{
        headers:{auth:token}
    });
}

export const getTodoListApi =async()=>{

    // ensure that user is logged in only then the request goes to backend
    let token=getToken();
    return axios.get(TODO_LIST,{
        headers:{auth:token}
    });
}


export function getToken(){
    let user=localStorage.getItem('user');
    if(!user){
        return;
    }
    const userobj=JSON.parse(user);
    return userobj.token;
}