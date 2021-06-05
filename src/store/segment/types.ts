export const START_SEGMENT = 'START_SEGMENT';
// export const ADD_SEGMENT = 'ADD_SEGMENT';

export interface SegmentState {
  recent: {
    categoryId: number;
    categoryName: string;
    start: number; // timestamp
  } | null
}

export interface startSegmentAction {
  type: typeof START_SEGMENT,
  payload: SegmentState['recent']
}


export type SegmentActionType = startSegmentAction;