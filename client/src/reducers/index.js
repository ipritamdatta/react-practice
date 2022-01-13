import { combineReducers } from "redux";
import {changeIsAuthenticated,roleReducer} from "./authFactory";

const rootReducer = combineReducers({
    user: changeIsAuthenticated,
    rolePermission: roleReducer
})

export default rootReducer;