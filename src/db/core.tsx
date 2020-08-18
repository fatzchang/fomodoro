import * as SQLite from 'expo-sqlite';

type Tables = 'date' | 'categories';

export const db = SQLite.openDatabase('fomodoro');

export const createIfNotExist = (tableName: Tables) => {
  db.transaction(tx => {
    let sqlStatement = '';
    if (tableName == 'date') {
      sqlStatement = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        date DATE NOT NULL
      )`;
    } else if (tableName = 'categories') {
      sqlStatement = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name VARCHAR(30) NOT NULL
      )`;
    }
    tx.executeSql(sqlStatement)
  }, (e) => {
    console.log(e)
  }, () => {
    console.log(`table "${tableName}" has created`)
  })
}