import { produce } from "immer";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
export enum CycleType {
  CREATE_NEW_CYCLE = "CREATE_NEW_CYCLE",
  MARK_CURRENT_CYCLE = "MARK_CURRENT_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case CycleType.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
      break;

    case CycleType.MARK_CURRENT_CYCLE:
      {
        const FindIdex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId;
        });
        if (FindIdex < 0) {
          return state;
        }
    return    produce(state, (draft) => {
          draft.activeCycleId = null;
          draft.cycles[FindIdex].finishedDate = new Date();
        });
      }
      break;
    case CycleType.INTERRUPT_CYCLE: {
      const currentInterruptCycle = state.cycles.findIndex((cycle) => {
        return cycle.id == state.activeCycleId;
      });
      if (currentInterruptCycle < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentInterruptCycle].interruptedDate = new Date();
      });
    }
    default:
      return state;
      break;
  }
}
