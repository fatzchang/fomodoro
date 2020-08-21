import { db, createIfNotExist } from './core';
import { DateScheme } from './date';
import { CategoryScheme } from './category';

export interface SegmentScheme {
  id: number;
  date_id: number;
  category_id: number;
  start: string; // DateTime
}

const tableName = 'segment';

export const initialize = () => {
  createIfNotExist(tableName);
}

export const insert = (date_id: DateScheme['id'], category_id: CategoryScheme['id'], start: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
          INSERT INTO ${tableName} (date_id, category_id, start) VALUES (?, ?, ?)
        `, [date_id, category_id, start], (tx, result) => {
        resolve(result);
      }, (tx, e) => {
        reject(e);
        return false;
      })
    })
  })
}

export const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM ${tableName}`, [], (tx, result) => {
        resolve(result)
      }, (tx, e) => {
        reject(e);
        return false;
      })
    })
  })
}

export const someByDateId = (dateId: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM ${tableName} WHERE date_id = ?`, [dateId], (tx, result) => {
        resolve(result)
      }, (tx, e) => {
        reject(e);
        return false;
      })
    })
  })
}
