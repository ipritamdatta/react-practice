import React from 'react'
import {useCounter} from "../contexts/CounterContext"

function ComponentB() {
    const {increaseCount} = useCounter();

    return (
        <div style={{backgroundColor: "red"}}>
            <button onClick={increaseCount}>IncreaseCount</button>
        </div>
    )
}

export default ComponentB
