import { SQLResultSet } from 'expo-sqlite';
import { db, createIfNotExist } from './core';

export interface CategoryScheme {
  id: number;
  name: string;
}

const tableName = 'category';

export const initialize = () => {
  createIfNotExist(tableName);
}

export const insertIfNotExist = async (name: string) => {
  const result = await oneByName(name);
  if (!result.rows.item(0)) {
    await insert(name);
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