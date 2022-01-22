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
                email TEXT NOT NULL,
                avatar TEXT,
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

        // chat table
        (function () {
            appLog('Creating Chat table...');
            const createChatTable = `CREATE TABLE IF NOT EXISTS Chat (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                from_user TEXT NOT NULL,
                from_user_name TEXT NOT NULL,
                to_user TEXT NOT NULL,
                to_user_name TEXT NOT NULL,
                message TEXT,
                active INTEGER NOT NULL DEFAULT 1,
                seen INTEGER NOT NULL DEFAULT 1,
                created_at NUMBER NOT NULL,
                updated_at NUMBER NOT NULL
            );`;
            sqlite.run(createChatTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('Chat table created');
            });
        })();
    }
}