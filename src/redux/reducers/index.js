import { combineReducers } from "redux";
import { productReducer,selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
    allProducts: productReducer, //key: value pair, you can define multiple reducers like productReducer, testReducer etc.
    product: selectedProductReducer
})

export default reducers;