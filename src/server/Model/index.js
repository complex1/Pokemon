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

        // swagerFolder
        (function () {
            appLog('Creating Swager Folder table...');
            const createSwagerFolderTable = `CREATE TABLE IF NOT EXISTS SwagerFolder (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            folder_name TEXT NOT NULL,
            folder_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            folder_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES User(id)
        );`;
            sqlite.run(createSwagerFolderTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('Swager Folder table created');
            }
            );
        })();

        // pikachuFolder
        (function () {
            appLog('Creating Pikachu Folder table...');
            const createPikachuFolderTable = `CREATE TABLE IF NOT EXISTS PikachuFolder (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            folder_name TEXT NOT NULL,
            folder_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            folder_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES User(id)
        );`;
            sqlite.run(createPikachuFolderTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('Pikachu Folder table created');
            }
            );
        })();

        // pikachuServer

        (function () {
            appLog('Creating Pikachu Server table...');
            const createPikachuServerTable = `CREATE TABLE IF NOT EXISTS PikachuServer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            proto TEXT NOT NULL,
            endpoint TEXT NOT NULL,
            docPath TEXT NOT NULL,
            docVersion TEXT NOT NULL,
            folder_id INTEGER NOT NULL,
            folder_name TEXT NOT NULL,
            server_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            server_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (folder_id) REFERENCES User(id)
    );`;
            sqlite.run(createPikachuServerTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('Pikachu Server table created');
            }
            );
        })();

        // Notes
        (function () {
            appLog('Creating Notes table...');
            const createNotesTable = `CREATE TABLE IF NOT EXISTS Notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            note_name TEXT NOT NULL,
            note_content TEXT NOT NULL,
            note_theme TEXT NOT NULL,
            text_theme TEXT NOT NULL,
            position TEXT NOT NULL,
            note_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            note_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES User(id)
            );`;
            sqlite.run(createNotesTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('Notes table created');
            }
            );
        })();

        (function () {
            appLog('Creating TASK table...');
            const createTaskTable = `CREATE TABLE IF NOT EXISTS Task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_user INTEGER NOT NULL,
            assigne_user INTEGER,
            title TEXT NOT NULL,
            detail TEXT NOT NULL,
            preority TEXT NOT NULL,
            child TEXT,
            parent TEXT,
            type TEXT NOT NULL,
            state TEXT NOT NULL,
            completed_at DATETIME,
            done_by DATETIME,
            comments TEXT,
            extras TEXT,
            task_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            task_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_user) REFERENCES User(id)
            );`;
            sqlite.run(createTaskTable, (err) => {
                if (err) {
                    appLog(err.message);
                }
                appLog('Notes table created');
            }
            );
        })();
    }

}