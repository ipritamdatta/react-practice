removed App.test.js, reportWebVitals.js, setupTests.js

1. npm run start

For json web server: 

npx json-server --watch data/db.json --port 8000

npm install react-router-dom@5


redux: (pigeon bank example for basic concept)
1. npm install redux react-redux
2. create state folder inside src directory.
3. Inside state create reducers folder and inside reducers folder create accountReducer.js & index.js file.
4. In accountReducer.js file write: 

```
const reducer = (state=0, action) => {
    switch(action.type){
        case "deposit":
            return state + action.payload;
        case "withdraw":
            return state - action.payload;
        default: 
            return state;
    }
}

export default reducer;
```
5. In index.js write: 

```
import {combineReducers} from 'redux';
import accountReducer from './accountReducer'

const reducers = combineReducers({
    account: accountReducer //accountReducer is the value and account is the key
})

export default reducers;
```

6. Inside state folder create store.js file and write: 

```
import {createStore} from 'redux'
import reducers from './reducers/index'

export const store = createStore(
    reducers,
    {} //this is a default state
) 
```

7. Inside index.js file of src folder write: 
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './state/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

8.Then go to App.js and write:

```
import {useSelector} from 'react-redux'
function App(){

    const state = useSelector((state) => state);

    console.log(state);
    return (

        <div></div>

    );
}
```

##### Action creator

1) create action-creators folder inside the state folder. and inside the action-creators create index.js file. write: 

```
export const depositMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "deposit",
            payload: amount
        })
    }
}

export const withdrawMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "withdraw",
            payload: amount
        })
    }
}
```
and centralize all of this. To do that create index.js file inside state folder and write: 

```
export * as actionCreators from './action-creators/index'
```
2) In App.js: 

```
import {useSelector, useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux';
import {actionCreators} from "./state/index"

const account   = useSelector((state) => state.account);
    const dispatch  = useDispatch();

    const {depositMoney, withdrawMoney} = bindActionCreators(actionCreators, dispatch);

    <div style={{textAlign: "center"}}>
        <h1>{account}</h1>
        <button onClick={() => depositMoney(1000)}>Deposit</button>
        <button onClick={() => withdrawMoney(1000)}>Withdraw</button>
    </div>
```

### redux thunk (works with asynchronous)

1) npm install redux-thunk
2) Inside store.js file of state folder write: 

```
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers/index'
import thunk from 'redux-thunk';

export const store = createStore(
    reducers,
    {}, //this is a default state
    applyMiddleware(thunk)
)
```