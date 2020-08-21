import { SegmentActionType, START_SEGMENT } from './types'

export function startSegment(
  dateId: number,
  categoryId: number,
  categoryName: string,
  start: number
): SegmentActionType {
  return {
    type: START_SEGMENT,
    payload: {
      dateId,
      categoryId,
      start,
      categoryName
    }
  }
}