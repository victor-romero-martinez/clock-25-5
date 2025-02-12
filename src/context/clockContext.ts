import { createContext } from "react";
import type { ClockAction, ClockState } from "../reducers/clockReducer";

export const ClockContext = createContext<{
  state: ClockState;
  dispatch: React.Dispatch<ClockAction>;
} | null>(null);
