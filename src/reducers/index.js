import { combineReducers } from "redux";
import todo from './todo'
import doing from './doing'
import done from './done'
export default combineReducers({
    todo,doing,done
});