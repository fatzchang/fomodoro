import { SQLResultSet } from 'expo-sqlite';
import { db, createIfNotExist } from './core';

const tableName = 'date';

export interface DateScheme {
  id: number;
  date: string;
}

export const initialize = () => {
  createIfNotExist(tableName);
}

export const todayString = () => {
  const todayObject = new Date();
  const todayString = `${todayObject.getFullYear()}-${todayObject.getMonth() + 1}-${todayObject.getDate()}`;

  return todayString;
}

export const createToday = async () => {
  const record = await oneByDate(todayString());
  if (!record.rows.item(0)) {
    const result = await insert(todayString());
    return result.insertId;
  } else {
    return record.rows.item(0).id as number;
  }
}

// select one record by date
export const oneByDate = (date: string): Promise<SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM ${tableName} WHERE date = ?
      `, [date], (tx, result) => {
        resolve(result)
      }, (tx, e) => {
        reject(e);
        return false;
      })
    })
  })
}

const insert = (date: string): Promise<SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO ${tableName} (date) VALUES (?)
      `, [date], (tx, result) => {
        resolve(result);
      }, (tx, e) => {
        reject(e);
        return false;
      })
    })
  })
}