import React from 'react'
import {useContext} from "react"
import { useCounter } from '../contexts/CounterContext'

function MyCounter() {
    const { count, increaseCount, decreaseCount } = useCounter();

    return (
        <div>
            <h3>Counter Component</h3>
            <p>Count: {count}</p>
            <button onClick={increaseCount}>Increase count</button>
            <button onClick={decreaseCount}>Decrease count</button>
        </div>
    )
}

export default MyCounter
