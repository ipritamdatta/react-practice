import {useState, createContext, useContext} from "react"

const CounterContext = createContext();

export const useCounter = () => useContext(CounterContext);

function CounterContextProvider(props) {

    const [ count, setCount] = useState(0)

    function increaseCount(){
        setCount(count + 1)
    }

    function decreaseCount()
    {
        setCount(count - 1)
    }

    const value = {count, increaseCount, decreaseCount}

    return (
        <CounterContext.Provider value={value}>
            {props.children}
        </CounterContext.Provider>
    )
}

export default CounterContextProvider;