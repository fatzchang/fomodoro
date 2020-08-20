import { SQLResultSet } from 'expo-sqlite';
import { db, createIfNotExist } from './core';

const tableName = 'category';

export interface CategoryScheme {
  id: number;
  name: string;
}

export const initialize = () => {
  createIfNotExist(tableName);
}

export const insertIfNotExist = async (name: string) => {
  let record = await oneByName(name);
  if (!record.rows.item(0)) {
    const result = await insert(name) as SQLResultSet;
    return result.insertId;
  } else {
    return record.rows.item(0).id as number;
  }
}

const insert = (name: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
          INSERT INTO ${tableName} (name) VALUES (?)
        `, [name], (tx, result) => {
        resolve(result);
      }, (tx, e) => {
        reject(e);
        return false;
      })
    })
  })

}

// select one record by date
const oneByName = (name: string): Promise<SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM ${tableName} WHERE name = ?
      `, [name], (tx, result) => {
        resolve(result)
      }, (tx, e) => {
        reject(e);
        return false;
      })
    })
  })
}

export const all = (): Promise<SQLResultSet> => {
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