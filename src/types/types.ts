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
