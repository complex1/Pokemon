const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class Chat {
    constructor(from_user, from_user_name, to_user, to_user_name, message) {
        this.from_user = from_user;
        this.from_user_name = from_user_name;
        this.to_user = to_user;
        this.to_user_name = to_user_name;
        this.message = message;
        this.active = 1;
        this.seen = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    addChat() {
        return new Promise((resolve, reject) => {
            sqlite.run(`INSERT INTO chat (from_user, from_user_name, to_user, to_user_name, message, active, seen, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [this.from_user, this.from_user_name, this.to_user, this.to_user_name, this.message, this.active, this.seen, this.created_at, this.updated_at],
                (err) => {
                    if (err) {
                        appLog(err);
                        reject(err);
                    } else {
                        resolve(this);
                    }
                });
        });
    }
    getChat() {
        return new Promise((resolve, reject) => {
            sqlite.all(`SELECT * FROM chat WHERE (from_user = ? AND to_user = ?) OR (from_user = ? AND to_user = ?) ORDER BY created_at ASC`,
                [this.from_user, this.to_user, this.to_user, this.from_user],
                (err, rows) => {
                    if (err) {
                        appLog.error(err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
        });
    }
    getSummaryChat(userEmail) {
        return new Promise((resolve, reject) => {
            sqlite.all(`SELECT * FROM chat WHERE from_user = ? OR to_user = ? ORDER BY created_at DESC`,
                [userEmail, userEmail],
                (err, rows) => {
                    if (err) {
                        appLog.error(err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
        });
    }
}

module.exports = Chat;