import { CategoryState } from './category/types';
import { SegmentState } from './segment/types';

export interface RootState {
  category: CategoryState,
  segment: SegmentState
}