import { SQLResultSet } from 'expo-sqlite';
import { db, createIfExist } from './core';

const tableName = 'date';

export const initializeDate = async () => {
  createIfExist(tableName);
  const todayObject = new Date();
  const todayString = `${todayObject.getFullYear()}-${todayObject.getMonth() + 1}-${todayObject.getDate()}`;

  try {
    const result = await oneByDate(todayString);
    if (!result.rows.item(0)) {
      await insertDate(todayString);
    }
  } catch (e) {
    console.log(e);
  }
}

// select one record by date
const oneByDate = (date: string): Promise<SQLResultSet> => {
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

const insertDate = (date: string): Promise<SQLResultSet> => {
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