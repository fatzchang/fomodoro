import { ADD_CATEGORY, EDIT_CATEGORY, Category, CategoryActionType } from './types'

export function addCategory(id: number, name: string): CategoryActionType {
  return {
    type: ADD_CATEGORY,
    payload: {
      id,
      name
    }
  }
}

export function editCategory(id: number, name: string): CategoryActionType {
  return {
    type: EDIT_CATEGORY,
    payload: {
      id,
      name
    }
  }
}