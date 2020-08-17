import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('fomodoro');

export const createIfExist = (tableName: string) => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      date DATE NOT NULL
    )`)
  }, (e) => {
    console.log(e)
  }, () => {
    console.log(`table "${tableName}" has created`)
  })
}