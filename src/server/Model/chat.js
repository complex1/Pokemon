const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class Chat {
    constructor(id, form_user, form_user_name, to_user, to_user_name, message) {
        this.id = id;
        this.form_user = form_user;
        this.form_user_name = form_user_name;
        this.to_user = to_user;
        this.to_user_name = to_user_name;
        this.message = message;
        this.active = 1;
        this.seen = 0;
    }
    addChat() {
        return new Promise((resolve, reject) => {
            sqlite.run(`INSERT INTO chat (form_user, form_user_name, to_user, to_user_name, message, active, seen, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [this.form_user, this.form_user_name, this.to_user, this.to_user_name, this.message, this.active, this.seen],
                (err) => {
                    if (err) {
                        appLog.error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }
    getChat() {
        return new Promise((resolve, reject) => {
            sqlite.all(`SELECT * FROM chat WHERE (form_user = ? AND to_user = ?) OR (form_user = ? AND to_user = ?) ORDER BY created_at ASC`,
                [this.form_user, this.to_user, this.to_user, this.form_user],
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
            sqlite.all(`SELECT * FROM chat WHERE form_user = ? OR to_user = ? ORDER BY created_at ASC`,
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