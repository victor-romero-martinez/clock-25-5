import { ACTIONS, ClockAction, ClockState } from "../types/types";
import { numberToTimeString } from "../utils/simple-number-to-time-string";

export const clockReducer = (
  state: ClockState,
  action: ClockAction
): ClockState => {
  switch (action.type) {
    case ACTIONS.BREAK_INCREMENT:
      return {
        ...state,
        breakLength: Math.min(state.breakLength + 1, 60),
        timer: state.isSession
          ? numberToTimeString(Math.min(state.breakLength + 1, 60))
          : state.timer,
      };
    case ACTIONS.BREAK_DECREMENT:
      return {
        ...state,
        breakLength: Math.max(state.breakLength - 1, 1),
        timer: state.isSession
          ? numberToTimeString(Math.max(state.breakLength - 1, 1))
          : state.timer,
      };
    case ACTIONS.SESSION_INCREMENT:
      return {
        ...state,
        sessionLength: Math.min(state.sessionLength + 1, 60),
        timer: state.isSession
          ? numberToTimeString(Math.min(state.sessionLength + 1, 60))
          : state.timer,
      };
    case ACTIONS.SESSION_DECREMENT:
      return {
        ...state,
        sessionLength: Math.max(state.sessionLength - 1, 1),
        timer: state.isSession
          ? numberToTimeString(Math.max(state.sessionLength - 1, 1))
          : state.timer,
      };
    case ACTIONS.PLAY_PAUSE:
      return { ...state, isPlay: !state.isPlay };
    case ACTIONS.SWITCH_TIMER:
      return {
        ...state,
        timer: state.isSession
          ? numberToTimeString(state.breakLength)
          : numberToTimeString(state.sessionLength),
        isSession: !state.isSession,
      };
    case ACTIONS.RESET:
      return {
        ...state,
        breakLength: 5,
        sessionLength: 25,
        isSession: true,
        timer: "25:00",
        isPlay: false,
      };
    default:
      return state;
  }
};
