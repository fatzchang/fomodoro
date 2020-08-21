import { createStore, combineReducers } from 'redux';
import { categoryReducer } from './category/reducer';
import { segmentReducer } from './segment/reducer';

const reducer = combineReducers({
  category: categoryReducer,
  segment: segmentReducer
});


const store = createStore(reducer);

export default store;