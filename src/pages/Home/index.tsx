import { Play } from "phosphor-react";
import { HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput } from "./styles";
import { useForm } from 'react-hook-form'
export function Home() {
    const { register, handleSubmit, watch } = useForm();

    const task = watch('task')
    const isChangeInput = !task
    function handleCreateNewCycle(data: any) {
        console.log(data)
    }
    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list='task-suggestions'
                        {...register('task')}
                    />
                    <datalist
                        id='task-suggestions'
                    >
                        <option value='projeto 1' />
                        <option value='projeto 2' />
                        <option value='projeto 3' />
                        <option value='projeto 4' />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type='number'
                        placeholder="00"
                        step={5}
                        max={60} />
                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton type="submit" disabled={isChangeInput}>
                    <Play size={26} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}