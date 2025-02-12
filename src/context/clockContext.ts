import { createContext } from "react";
import { ClockAction, ClockState } from "../types/types";

export const ClockContext = createContext<{
  state: ClockState;
  dispatch: React.Dispatch<ClockAction>;
} | null>(null);
