import { act } from "react-dom/test-utils";

const Doing=(state=[],action)=>{
    switch(action.type){
        case 'SETDOING':
            return action.payload;
        case 'DELDOING':
            let nek=[]
            for(let i=0;i<state.length;i++){
                if(action.payload._id!==state[i]._id){
                    nek.push(state[i]);
                }
            }
            return nek;
        case 'UPDATEDOING':
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
export default Doing;