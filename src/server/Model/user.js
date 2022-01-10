const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = 'user';
    }
    addUser() {
        const sql = `INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)`;
        const params = [this.name, this.email, this.password, this.role];
        return new Promise((resolve, reject) => {
            sqlite.run(sql, params, (err) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`User ${this.name} added`);
                    resolve(this);
                }
            });
        });
    }
    getUser(email) {
        const sql = `SELECT * FROM User WHERE email = ?`;
        const params = [email];
        return new Promise((resolve, reject) => {
            sqlite.get(sql, params, (err, row) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`User ${email} found`);
                    resolve(row);
                }
            });
        });
    }
    getUserById(id) {
        const sql = `SELECT * FROM User WHERE id = ?`;
        const params = [id];
        return new Promise((resolve, reject) => {
            sqlite.get(sql, params, (err, row) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`User ${id} found`);
                    resolve(row);
                }
            });
        });
    }
    getAllUsers() {
        const sql = `SELECT * FROM User`;
        return new Promise((resolve, reject) => {
            sqlite.all(sql, (err, rows) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog('All users found');
                    resolve(rows);
                }
            });
        });
    }
    updateUser(id, name, email, password) {
        const sql = `UPDATE User SET username = ?, email = ?, password = ? WHERE id = ?`;
        const params = [name, email, password, id];
        return new Promise((resolve, reject) => {
            sqlite.run(sql, params, (err) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`User ${id} updated`);
                    resolve(this);
                }
            });
        });
    }
    deleteUser(id) {
        const sql = `DELETE FROM User WHERE id = ?`;
        const params = [id];
        return new Promise((resolve, reject) => {
            sqlite.run(sql, params, (err) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`User ${id} deleted`);
                    resolve(this);
                }
            });
        });
    }
    authenticate(email, password) {
        const sql = `SELECT * FROM User WHERE email = ? AND password = ?`;
        const params = [email, password];
        return new Promise((resolve, reject) => {
            sqlite.get(sql, params, (err, row) => {
                appLog(err, row);
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`User ${email} authenticated`);
                    appLog(row);
                    resolve(row);
                }
            });
        });
    }
}

module.exports = User;