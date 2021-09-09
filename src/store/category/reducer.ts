import { CategoryState, CategoryActionType, ADD_CATEGORY, EDIT_CATEGORY } from './types';

const initialState: CategoryState = {
  data: []
}

export const categoryReducer = (
  state: CategoryState = initialState,
  action: CategoryActionType
): CategoryState => {
  switch (action.type) {
    case ADD_CATEGORY:
      const list = [...state.data];
      list.push(action.payload);
      // sort by id
      list.sort((a, b) => {
        return a.id - b.id
      });

      return {
        ...state,
        data: list
      }
    case EDIT_CATEGORY:
    // list = [...state.data];


    default:
      return state;
  }
}
