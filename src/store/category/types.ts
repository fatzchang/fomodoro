export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  data: Category[]
}

interface AddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: Category;
}

interface EditCategoryAction {
  type: typeof EDIT_CATEGORY;
  payload: Category
}

export type CategoryActionType = AddCategoryAction | EditCategoryAction;