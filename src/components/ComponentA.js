import React from 'react'
import {useCounter} from "../contexts/CounterContext"
import ComponentB from './ComponentB';

function ComponentA() {
    const {count} = useCounter();

    return (
        <div style={{backgroundColor: "wheat"}}>
            <p>Count: {count}</p>
            <ComponentB />
        </div>
    )
}

export default ComponentA
