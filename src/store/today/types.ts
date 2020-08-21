export const SET_TODAY_ID = 'SET_TODAY_ID';

export interface TodayState {
  id: number
}

export interface SetTodayIdAction {
  type: typeof SET_TODAY_ID,
  payload: {
    id: number
  }
}

export type TodayActionType = SetTodayIdAction;