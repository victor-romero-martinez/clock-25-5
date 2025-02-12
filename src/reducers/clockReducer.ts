export type ClockState = {
  breakLength: number;
  sessionLength: number;
  isSession: boolean;
  timer: string;
  isPlay: boolean;
};

export enum ACTIONS {
  BREAK_INCREMENT = "BREAK_INCREMENT",
  BREAK_DECREMENT = "BREAK_DECREMENT",
  SESSION_INCREMENT = "SESSION_INCREMENT",
  SESSION_DECREMENT = "SESSION_DECREMENT",
  SWITCH_TIMER = "SWITCH_TIMER",
  PLAY_PAUSE = "PLAY_PAUSE",
  RESET = "RESET",
}

export type ClockAction =
  | { type: ACTIONS.BREAK_INCREMENT }
  | { type: ACTIONS.BREAK_DECREMENT }
  | { type: ACTIONS.SESSION_INCREMENT }
  | { type: ACTIONS.SESSION_DECREMENT }
  | { type: ACTIONS.SWITCH_TIMER }
  | { type: ACTIONS.PLAY_PAUSE }
  | { type: ACTIONS.RESET };

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
          ? fixTime(Math.min(state.breakLength + 1, 60))
          : state.timer,
      };
    case ACTIONS.BREAK_DECREMENT:
      return {
        ...state,
        breakLength: Math.max(state.breakLength - 1, 1),
        timer: state.isSession
          ? fixTime(Math.max(state.breakLength - 1, 1))
          : state.timer,
      };
    case ACTIONS.SESSION_INCREMENT:
      return {
        ...state,
        sessionLength: Math.min(state.sessionLength + 1, 60),
        timer: state.isSession
          ? fixTime(Math.min(state.sessionLength + 1, 60))
          : state.timer,
      };
    case ACTIONS.SESSION_DECREMENT:
      return {
        ...state,
        sessionLength: Math.max(state.sessionLength - 1, 1),
        timer: state.isSession
          ? fixTime(Math.max(state.sessionLength - 1, 1))
          : state.timer,
      };
    case ACTIONS.PLAY_PAUSE:
      return { ...state, isPlay: !state.isPlay };
    case ACTIONS.SWITCH_TIMER:
      return {
        ...state,
        timer: state.isSession
          ? fixTime(state.breakLength)
          : fixTime(state.sessionLength),
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

export function fixTime(num: number) {
  return `${num.toString().padStart(2, "0")}:00`;
}
