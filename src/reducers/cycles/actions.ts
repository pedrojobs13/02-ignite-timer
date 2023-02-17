import { CycleType, Cycle } from "./reducer";

export function markCurrentCycleAsFinishedAction() {
  return {
    type: CycleType.MARK_CURRENT_CYCLE,
  };
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: CycleType.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interruptCycleAction() {
  return {
    type: CycleType.INTERRUPT_CYCLE,
  };
}
