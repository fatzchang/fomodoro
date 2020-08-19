import * as SQLite from 'expo-sqlite';

type Table = 'date' | 'category' | 'segment';

export const db = SQLite.openDatabase('fomodoro');

export const createIfNotExist = (tableName: Table) => {
  db.transaction(tx => {
    let sqlStatement = '';
    if (tableName === 'date') {
      sqlStatement = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        date DATE NOT NULL
      )`;
    } else if (tableName === 'category') {
      sqlStatement = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name VARCHAR(30) NOT NULL
      )`;
    } else if (tableName === 'segment') {
      sqlStatement = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        date_id INTERGER NOT NULL,
        category_id INTERGER NOT NULL,
        start DATETIME
      )`;
    }

    tx.executeSql(sqlStatement)
  }, (e) => {
    console.log(e)
  }, () => {
    console.log(`table "${tableName}" has created`)
  })
}