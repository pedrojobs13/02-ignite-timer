import { useContext } from "react";
import { cyclesContext } from "../../../../context/CyclesContext";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleFormEnter({ register }: any) {
  const { activeCycle } = useContext(cyclesContext)

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list='task-suggestions'
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id='task-suggestions'>
        <option value='projeto 1' />
        <option value='projeto 2' />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type='number'
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
