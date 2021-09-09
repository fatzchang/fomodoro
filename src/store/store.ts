import { createStore, combineReducers } from 'redux';
import { categoryReducer } from './category/reducer';
import { segmentReducer } from './segment/reducer';
import { todayReducer } from './today/reducer';

const reducer = combineReducers({
  category: categoryReducer,
  segment: segmentReducer,
  today: todayReducer
});


const store = createStore(reducer);

export default store;