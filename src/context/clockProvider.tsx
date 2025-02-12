import { useReducer } from "react";
import { clockReducer } from "../reducers/clockReducer";
import { ClockState } from "../types/types";
import { ClockContext } from "./clockContext";

const initialState: ClockState = {
  breakLength: 5,
  sessionLength: 25,
  timer: "25:00",
  isSession: true,
  isPlay: false,
};

export default function ClockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(clockReducer, initialState);

  return (
    <ClockContext.Provider value={{ state, dispatch }}>
      {children}
    </ClockContext.Provider>
  );
}
