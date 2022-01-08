BASIC OF REDUX: 



##### 
Create a project with react. 
Then, 

1) npm run start
2) npm install redux react-redux
3) create actions folder inside src folder. Create index.js file inside actions folder. 

4) create reducers folder inside src folder and create upDown.js file inside reducers folder.
5) create store.js file inside src folder.
6) In app.js write: 
```
import React from 'react'
import "./App.css"

const App = () => {
  return (
    <>
      <div className="container">
        <h1>Increment / Decrement counter</h1>
        <h4>Using react and redux</h4>

        <div className="quantity">
          <a className="quantity__minus" title='Decrement'><span>-</span></a>
          <input type="text" name='quantity' className='quantity__input'/>
          <a className="quantity__plus" title='Increment'><span>+</span></a>
        </div>
        
      </div>
    </>
  )
}

export default App;

```

7) Inside actions->index.js file write: 

```
export const incNumber = () => { 
    return {
        type: "INCREMENT"
    }
}

export const decNumber = () => { 
    return {
        type: "DECREMENT"
    }
}
```

###### NOTE: IN ACTION: We have told what are the actions we have/ are present.

8) Now, what will this types do, we need to tell this. So, to do that, go to reducers->upDown.js file and write: 

```
const initialState = 0;
const changeTheNumber = (state = initialState, action) => {
    switch(action.type)
    {
        case "INCREMENT": return state + 1;
        case "DECREMENT": return state - 1;
        default: return state;
    }
}

export default changeTheNumber;
```

9) in reducers->index.js write: 

```
import changeTheNumber from "./upDown";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    changeTheNumber
})

export default rootReducer;
```

###### NOTE: In reducer we have told what to do with the actions.

10) 
###### NOTE: We need to add the reducer in store.js

In store.js of the src folder write: 

```
import { createStore } from 'redux';
import rootReducer from "./reducers/index";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //this line is for redux chrome devtools & add redux devtools in chrome for this.
)

export default store;
```

11) 
###### Import the store in index.js

write in index.js of src folder: 

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import {Provider} from 'react-redux';

store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

###### NOTE: Now our root App.js has the state value to use in all over the project dom.

###### TO DISPLAY THE STATE VALUE (useSelector)

1) useSelector is used to get the state values. and dispatch triggers the action then action goes to reducer.
to display, In App.js write:

```
import React from 'react'
import "./App.css"
import {useSelector, useDispatch} from 'react-redux'
import {incNumber, decNumber} from './actions/index'

const App = () => {

  const myState = useSelector((state) => state.changeTheNumber);
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <h1>Increment / Decrement counter</h1>
        <h4>Using react and redux</h4>

        <div className="quantity">
          <a className="quantity__minus" title='Decrement' onClick={() => dispatch(decNumber())}><span>-</span></a>
          <input type="text" name='quantity' className='quantity__input' value={myState}/>
          <a className="quantity__plus" title='Increment' onClick={() => dispatch(incNumber())}><span>+</span></a>
        </div>
        
      </div>
    </>
  )
}

export default App;

```

###### How to pass parameters in incNumber method

1) When user clicks on the App.js's increment button (example on onClick={() => dispatch(incNumber())}) then, we will
pass a parameter on the incNumber() like the following in App.js: 

```
onClick={() => dispatch(incNumber(5))}
```

2) Then, as dispatch triggers the action, we will go to actions->index.js and will write: 

```
export const incNumber = (num) => { 
    return {
        type: "INCREMENT",
        payload: num
    }
}
```

3) Then action goes to reducer, so in reducers->upDown.js we will write: 

```
const initialState = 0;
const changeTheNumber = (state = initialState, action) => {
    switch(action.type)
    {
        case "INCREMENT": return state + action.payload;
        case "DECREMENT": return state - 1;
        default: return state;
    }
}

export default changeTheNumber;
```
