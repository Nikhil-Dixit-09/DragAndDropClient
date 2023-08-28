import { act } from "react-dom/test-utils";

const Todo=(state=[],action)=>{
    switch(action.type){
        case 'ADDTODO':
            return [...state,action.payload];
        case 'SETTODOS':
            return action.payload;
        case 'DELTODO':
            let ne=[]
            for(let i=0;i<state.length;i++){
                if(action.payload._id!==state[i]._id){
                    ne.push(state[i]);
                }
            }
            return ne;
        case 'UPDATETODO':
            let xy=[]
            for(let i=0;i<state.length;i++){
                if(action.payload._id!==state[i]._id){
                    xy.push(state[i]);
                }else{
                    xy.push(action.payload);
                }
            }
            return xy;
        
        
        default:
            return state;
    }
}
export default Todo;