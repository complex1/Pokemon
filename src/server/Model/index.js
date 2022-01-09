const sqlite = require('../Module/sqlite');

module.exports = {
    init() {
        (function () {
            console.log('Creating User table...');
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
                    console.log(err.message);
                }
                console.log('User table created');
            });
        })();
    }
}