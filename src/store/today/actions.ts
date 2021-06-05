import { TodayActionType, SET_TODAY_ID } from './types';

export function setTodayId(id: number): TodayActionType {
  return {
    type: SET_TODAY_ID,
    payload: {
      id
    }
  }
}