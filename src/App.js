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
          <a className="quantity__minus" title='Decrement' onClick={() => dispatch(decNumber(5))}><span>-</span></a>
          <input type="text" name='quantity' className='quantity__input' value={myState}/>
          <a className="quantity__plus" title='Increment' onClick={() => dispatch(incNumber(5))}><span>+</span></a>
        </div>
        
      </div>
    </>
  )
}

export default App;
