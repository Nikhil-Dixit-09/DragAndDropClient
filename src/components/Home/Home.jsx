import React, { useState } from 'react'
import './Home.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { addTask } from '../../actions/tasks';
import { useSelector } from 'react-redux';
import { getTodos } from '../../actions/tasks';
import { useEffect } from 'react';
import { deleteTodo } from '../../actions/tasks';
import del from '../../assets/icons8-delete-25.png'
import edi from '../../assets/icons8-edit-25.png'
import { editTodo } from '../../actions/tasks';
import { swapTodos } from '../../actions/tasks';
import { getDoing } from '../../actions/tasks';
import { changeToDoing } from '../../actions/tasks';
import { swapDoing } from '../../actions/tasks';
import { changeToTodo } from '../../actions/tasks';
import { changeToDone } from '../../actions/tasks';
import { getDone } from '../../actions/tasks';
import { swapDone } from '../../actions/tasks';
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "",
  padding: grid,
  width: 250
});
const Home = () => {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  const [show,setShow]=useState(false);
  const dispatch = useDispatch();
  
  function onDragEnd(result) {
    console.log(result);
    if (!result.destination) {
      return;
    }
    if(result.destination.droppableId===result.source.droppableId){
      console.log('hiiii');
      if(result.destination.droppableId==='todos'){
        let see=[result.destination.index,result.source.index];
        // dispatch({type:'SWAPTODOS',payload:see});
        dispatch(swapTodos(see));
      }else if(result.destination.droppableId==="doing"){
        let see=[result.destination.index,result.source.index];
        // dispatch({type:'SWAPDOING',payload:see});
        dispatch(swapDoing(see));
      }else if(result.destination.droppableId==="done"){
        let see=[result.destination.index,result.source.index];
        dispatch(swapDone(see));
      }
    }else{
      let obj={};
      obj._id=result.draggableId;
      obj.destination=result.destination.index;
      if(result.source.droppableId==="todos"){
        dispatch({type:'DELTODO',payload:obj});
      }else if(result.source.droppableId==="doing"){
        dispatch({type:'DELDOING',payload:obj});
      }else if(result.source.droppableId==="done"){
        dispatch({type:'DELDONE',payload:obj});
      }
      if(result.destination.droppableId==="todos"){
        dispatch(changeToTodo(obj));
      }else if(result.destination.droppableId==="doing"){
        dispatch(changeToDoing(obj));
      }else if(result.destination.droppableId==="done"){
        dispatch(changeToDone(obj));
      }
      
    }
   
  }
  const [edit,setEdit]=useState({
    title:'',
    description:'',
    id:''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
  }
  const todos = useSelector((state) => state.todo);
  const doing = useSelector((state) => state.doing);
  const done = useSelector((state) => state.done);
  console.log(todos);
  console.log(doing);
  console.log(done);
  useEffect(() => {
    dispatch(getTodos());
    dispatch(getDoing());
    dispatch(getDone());
  }, [])
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteTodo(id));
  }
  const handleEdit=(id,title,description)=>{
    setShow(true);
    setEdit({id:id,title:title,description:description});
  }
  const handleEditSubmit=(e)=>{
    e.preventDefault();
    console.log(edit);
    dispatch(editTodo(edit));
    setShow(false);
  }
  
  return (
    <div>
      <div className='addTask'>
        {
          !show &&
          <form className='form' onSubmit={handleSubmit}>
          <div>
            Enter Title:
            <div>
              <input type="text" className='title' required onChange={(e) => setTask({ ...task, title: e.target.value })} />
            </div>
          </div>
          <div>
            Enter Description:
            <div>
              <textarea name="" id="" cols="20" required rows="7" className='description' onChange={(e) => setTask({ ...task, description: e.target.value })}></textarea>
            </div>

          </div>
          <button type='submit' className='addButton'>Add task</button>
        </form>
        }
        {
          show &&
          <form className='form' onSubmit={handleEditSubmit}>
          <div>
            Enter Title:
            <div>
              <input type="text" value={edit.title} className='title' required onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
            </div>
          </div>
          <div>
            Enter Description:
            <div>
              <textarea name="" id="" cols="20" required rows="7" className='description' value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })}></textarea>
            </div>

          </div>
          <button type='submit' className='addButton'>Edit task</button>
        </form> 
        }
        
      </div>

      <div className='row'>

        <DragDropContext onDragEnd={onDragEnd}>


          <Droppable droppableId="todos" type="TASKS">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)} className='Droppable-container'
              >
                <div>To Dos</div>
                {todos.map((item, index) => (
                    <Draggable title={item.title} key={item._id} draggableId={item._id} index={index} description={item.description}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )} className='draggable-item'
                        >
                          <div className='task'>
                            <div className='options'>
                            <div onClick={(e) => handleDelete(item._id)} className='delete'>
                              <img src={del} alt="" />
                            </div>
                            <div onClick={(e)=>handleEdit(item._id,item.title,item.description)} className='edit'>
                            <img src={edi} alt="" />
                            </div>
                            </div>
                            
                            <div  {...provided.dragHandleProps}>
                              <div className='taskTitle' >

                                <div>
                                  Title: {item.title}
                                </div>
                              </div>
                              <div className='taskDescription'>
                                Description: {item.description}
                              </div>
                            </div>

                          </div>

                        </div>
                      )}
                    </Draggable>
                  

                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doing" type="TASKS">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)} className='Droppable-container'
              >
                <div>Doing</div>
                {doing.map((item, index) => (
                 

                    <Draggable title={item.title} key={item._id} draggableId={item._id} index={index} description={item.description}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )} className='draggable-item'
                        >
                          <div className='task'>
                            <div className='options'>
                            <div onClick={(e) => handleDelete(item._id)} className='delete'>
                              <img src={del} alt="" />
                            </div>
                            <div onClick={(e)=>handleEdit(item._id,item.title,item.description)} className='edit'>
                            <img src={edi} alt="" />
                            </div>
                            </div>
                            
                            <div  {...provided.dragHandleProps}>
                              <div className='taskTitle' >

                                <div>
                                  Title: {item.title}
                                </div>
                              </div>
                              <div className='taskDescription'>
                                Description: {item.description}
                              </div>
                            </div>

                          </div>

                        </div>
                      )}
                    </Draggable>
                  

                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done" type="TASKS">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)} className='Droppable-container'
              >
                <div>Done</div>
                {done.map((item, index) => (
                 

                    <Draggable title={item.title} key={item._id} draggableId={item._id} index={index} description={item.description}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )} className='draggable-item'
                        >
                          <div className='task'>
                            <div className='options'>
                            <div onClick={(e) => handleDelete(item._id)} className='delete'>
                              <img src={del} alt="" />
                            </div>
                            <div onClick={(e)=>handleEdit(item._id,item.title,item.description)} className='edit'>
                            <img src={edi} alt="" />
                            </div>
                            </div>
                            
                            <div  {...provided.dragHandleProps}>
                              <div className='taskTitle' >

                                <div>
                                  Title: {item.title}
                                </div>
                              </div>
                              <div className='taskDescription'>
                                Description: {item.description}
                              </div>
                            </div>

                          </div>

                        </div>
                      )}
                    </Draggable>
                  

                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          
        </DragDropContext>
      </div>
    </div>
  )
}

export default Home

