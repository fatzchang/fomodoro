import { createStore, combineReducers } from 'redux';
import { categoryReducer } from './category/reducer';

const reducer = combineReducers({
  category: categoryReducer
});


const store = createStore(reducer);

export default store;