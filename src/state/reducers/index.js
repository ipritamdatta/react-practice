import {combineReducers} from 'redux';
import accountReducer from './accountReducer'

const reducers = combineReducers({
    account: accountReducer //accountReducer is the value and account is the key
})

export default reducers;