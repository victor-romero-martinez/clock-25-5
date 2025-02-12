import { useReducer } from "react";
import { clockReducer, ClockState } from "../reducers/clockReducer";
import { ClockContext } from "./clockContext";

const initialState: ClockState = {
  breakLength: 1,
  sessionLength: 1,
  timer: "00:05",
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
