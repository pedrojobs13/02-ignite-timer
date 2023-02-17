import { Hand, Play } from "phosphor-react";
import {
    HomeContainer, StartCountDownButton, StopCountDownButton
} from "./styles";
import { Countdown } from "./components/Countdown";
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCycleFormEnter } from "./components/NewCycleFormEnter";
import { useContext } from "react";
import { cyclesContext } from "../../context/CyclesContext";

interface NewCycleFormData {
    task: string
    minutesAmount: number
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo precisa ser de 5 minutos')
        .max(60, 'O cliclo precisa ser no máximo de 60 minutos'),
})

export function Home() {
    const { activeCycle, createNewCycle, interruptCycle } = useContext(cyclesContext)


    const NewCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    });

    const { handleSubmit, watch, reset, register } = NewCycleForm
    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset();
    }


    const task = watch('task')
    const isChangeInput = !task;
    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleFormEnter register={register} />
                <Countdown />
                {
                    (activeCycle ?
                        <StopCountDownButton onClick={interruptCycle} >
                            <Hand size={26} />
                            Interroper
                        </StopCountDownButton> :
                        <StartCountDownButton type="submit" disabled={isChangeInput}>
                            <Play size={26} />
                            Começar
                        </StartCountDownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}

