import { TodayState, TodayActionType, SET_TODAY_ID } from './types';

const initialState: TodayState = {
  id: 0
}

export const todayReducer = (
  state: TodayState = initialState,
  action: TodayActionType
): TodayState => {
  switch (action.type) {
    case SET_TODAY_ID:
      return {
        ...state,

      }

    default:
      return state;
  }
}
