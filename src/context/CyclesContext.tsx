import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { createNewCycleAction, interruptCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface NewCycleFormData {
    task: string
    minutesAmount: number
}

interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: NewCycleFormData) => void
    interruptCycle: () => void

}

interface CycleProviderProps {
    children: ReactNode
}
export const cyclesContext = createContext({} as CycleContextType) // exportação do contexto


export function CyclesContextProvider({ children }:
    CycleProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    },
        () => {
            const storedStateASJSON = localStorage.getItem('@ignite-timer: cycles-state-1.0.0')
            if (storedStateASJSON) {
                return JSON.parse(storedStateASJSON)
            }
        },
    )
    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            )
        }
        return 0
    })


    useEffect(() => {
        const CycleJson = JSON.stringify(cyclesState)
        localStorage.setItem('@ignite-timer: cycles-state-1.0.0', CycleJson)
    }, [cyclesState]);



    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())

    }
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }


    function createNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(createNewCycleAction(newCycle))
        setAmountSecondsPassed(0);

    }

    function interruptCycle() {

        dispatch(
            interruptCycleAction()
        )
    }
    
    return (

        < cyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCycle
        }}>

            {children}
        </ cyclesContext.Provider >

    )
}