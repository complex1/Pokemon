const sqlite = require('../Module/sqlite');
const { appLog } = require('../log/index');

module.exports = {
    init() {
        (function () {
            appLog('Creating User table...');
            const createUserTable = `CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL,
            role TEXT,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`;

            sqlite.run(createUserTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('User table created');
            });
        })();

        (function () {
            appLog('Creating User detail table...');
            const createUserDetailTable = `CREATE TABLE IF NOT EXISTS UserDetail (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                phone TEXT,
                address TEXT,
                access TEXT,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES User(id)
            );`;
            sqlite.run(createUserDetailTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('User detail table created');
            });
        })();
    }
}