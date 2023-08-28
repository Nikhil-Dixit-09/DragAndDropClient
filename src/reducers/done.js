const Done=(state=[],action)=>{
    switch(action.type){
        case 'SETDONE':
            return action.payload;
        case 'DELDONE':
            let nek=[]
            for(let i=0;i<state.length;i++){
                if(action.payload._id!==state[i]._id){
                    nek.push(state[i]);
                }
            }
            return nek;
        case 'UPDATEDONE':
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
export default Done;