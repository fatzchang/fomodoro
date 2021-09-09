import { SegmentActionType, START_SEGMENT } from './types'

export function startSegment(
  categoryId: number,
  categoryName: string,
  start: number
): SegmentActionType {
  return {
    type: START_SEGMENT,
    payload: {
      categoryId,
      start,
      categoryName
    }
  }
}