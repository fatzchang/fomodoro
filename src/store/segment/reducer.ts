import { SegmentState, SegmentActionType, START_SEGMENT } from './types';

const initialState: SegmentState = {
  recent: null
}

export const segmentReducer = (
  state: SegmentState = initialState,
  action: SegmentActionType
): SegmentState => {
  switch (action.type) {
    case START_SEGMENT:
      return {
        ...state,
        recent: action.payload
      }

    default:
      return state;
  }
}
