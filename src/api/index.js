import axios from 'axios';
const API=axios.create({baseURL:'http://localhost:8000/'});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});
export const addTask=(taskData)=>API.post('/tasks/addTask',taskData);
export const deleteTodo=(taskId)=>API.delete(`/tasks/deleteTodo/${taskId}`);
export const editTask=(editData)=>API.put('/tasks/editTask',editData);
export const getTodos=(taskData)=>API.get('/tasks/getTodos');
export const getDoing=(taskData)=>API.get('/tasks/getDoing');
export const getDone=(taskData)=>API.get('/tasks/getDone');
export const swapTodos=(swap)=>API.put('/tasks/swapTodos',swap);
export const swapDoing=(swap)=>API.put('/tasks/swapDoing',swap);
export const swapDone=(swap)=>API.put('/tasks/swapDone',swap);
export const changeToDoing=(info)=>API.put('/tasks/changeToDoing',info);
export const changeToTodo=(info)=>API.put('/tasks/changeToTodo',info);
export const changeToDone=(info)=>API.put('/tasks/changeToDone',info);
