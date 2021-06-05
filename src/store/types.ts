import { CategoryState } from './category/types';
import { SegmentState } from './segment/types';
import { TodayState } from './today/types';

export interface RootState {
  category: CategoryState,
  segment: SegmentState,
  today: TodayState
}