import SQLite from 'react-native-sqlite-storage';

const databaseName = 'favorites.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'Favorites Database';
const databaseSize = 200000;

SQLite.DEBUG(true);
SQLite.enablePromise(true);

class Database {
  constructor() {
    this.db = null;
    this.initializeDatabase();
  }

  initializeDatabase() {
    return SQLite.openDatabase({ name: databaseName, createFromLocation: '~favorites.db' })
      .then((db) => {
        this.db = db;
        console.log('Database opened');
      })
      .catch((error) => {
        console.error('Unable to open database:', error);
      });
  }

  closeDatabase() {
    if (this.db) {
      this.db.close()
        .then(() => {
          console.log('Database closed');
        })
        .catch((error) => {
          console.error('Error closing database:', error);
        });
    }
  }

  createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      buildingId INTEGER,
      buildingName TEXT,
      latitude REAL,
      longitude REAL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );`;
    return this.db.executeSql(sql);
  }

  addFavorite(userId, buildingId, buildingName, latitude, longitude) {
    const sql = `INSERT INTO favorites (userId, buildingId, buildingName, latitude, longitude)
                 VALUES (?, ?, ?, ?, ?);`;
    return this.db.executeSql(sql, [userId, buildingId, buildingName, latitude, longitude]);
  }

  removeFavorite(id) {
    const sql = `DELETE FROM favorites WHERE id = ?;`;
    return this.db.executeSql(sql, [id]);
  }

  getFavorites(userId) {
    const sql = `SELECT * FROM favorites WHERE userId = ?;`;
    return this.db.executeSql(sql, [userId]);
  }
}

export default new Database();
