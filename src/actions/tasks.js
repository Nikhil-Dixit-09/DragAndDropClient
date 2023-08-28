import * as api from '../api';
import Swal from 'sweetalert2'

export const addTask=(taskData)=>async(dispatch)=>{
    try{
        const {data}=await api.addTask(taskData);
        console.log(data);
        dispatch({type:'ADDTODO',payload:data.data})
    }catch(err){
        console.log(err);
    }
}
export const getTodos=()=>async(dispatch)=>{
    try{
        const {data}=await api.getTodos();
        console.log(data);
        dispatch({type:'SETTODOS',payload:data.data});
    }catch(err){
        console.log(err);
    }
}
export const getDone=()=>async(dispatch)=>{
    try{
        const {data}=await api.getDone();
        console.log(data);
        dispatch({type:'SETDONE',payload:data.data});
    }catch(err){
        console.log(err);
    }
}
export const deleteTodo=(id)=>async(dispatch)=>{
    try{
        const {data}=await api.deleteTodo(id);
        console.log(data.data);
        if(data.data.status==="To Do"){
            dispatch({type:'DELTODO',payload:data.data});
        }else if(data.data.status==="doing"){
            dispatch({type:'DELDOING',payload:data.data});
        }else{
            dispatch({type:'DELDONE',payload:data.data});
        }
    }catch(err){
        console.log(err);
    }
}
export const editTodo=(editData)=>async(dispatch)=>{
    try{
        const {data}=await api.editTask(editData);
        console.log(data);
        if(data.data.status==="To Do"){
            dispatch({type:'UPDATETODO',payload:data.data});
        }else if(data.data.status==="doing"){
            dispatch({type:'UPDATEDOING',payload:data.data});
        }else{
            dispatch({type:'UPDATEDONE',payload:data.data});
        }
    }catch(err){
        console.log(err);
    }
}
export const swapTodos=(swap)=>async(dispatch)=>{
    try{
        const {data}=await api.swapTodos(swap);
        console.log(data);
        dispatch({type:'SETTODOS',payload:data.data});
    }catch(err){
        console.log(err);
    }
}
export const swapDoing=(swap)=>async(dispatch)=>{
    try{
        const {data}=await api.swapDoing(swap);
        console.log(data);
        dispatch({type:'SETDOING',payload:data.data});
    }catch(err){
        console.log(err);
    }
}
export const swapDone=(swap)=>async(dispatch)=>{
    try{
        const {data}=await api.swapDone(swap);
        console.log(data);
        dispatch({type:'SETDONE',payload:data.data});
    }catch(err){
        console.log(err);
    }
}
export const changeToDoing=(info)=>async(dispatch)=>{
    try{
        const {data}=await api.changeToDoing(info);
        dispatch({type:'SETDOING',payload:data.data});
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
export const changeToDone=(info)=>async(dispatch)=>{
    try{
        const {data}=await api.changeToDone(info);
        console.log(data);
        dispatch({type:'SETDONE',payload:data.data});
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
export const changeToTodo=(info)=>async(dispatch)=>{
    try{
        const {data}=await api.changeToTodo(info);
        dispatch({type:'SETTODOS',payload:data.data});
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
export const getDoing=()=>async(dispatch)=>{
    try{
        const {data}=await api.getDoing();
        console.log(data);
        dispatch({type:'SETDOING',payload:data.data});
    }catch(err){
        console.log(err);
    }
}