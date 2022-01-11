const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class UserDetail {
    constructor (user_id, name, phone, address, access) {
        this.user_id = user_id;
        this.name = name;
        this.phone = phone || '';
        this.address = address || '';
        this.access = access || ['user'];
    }
    addUserDetail() {
        const sql = `INSERT INTO UserDetail (user_id, name, phone, address, access) VALUES (?, ?, ?, ?, ?)`;
        const params = [this.user_id, this.name, this.phone, this.address, this.access];
        return new Promise((resolve, reject) => {
            sqlite.run(sql, params, function (err) {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`UserDetail ${this.lastID} added`);
                    resolve(this.lastID);
                }
            });
        });
    }
    getUserDetail(user_id) {
        const sql = `SELECT * FROM UserDetail WHERE user_id = ?`;
        const params = [user_id];
        return new Promise((resolve, reject) => {
            sqlite.get(sql, params, (err, row) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    getUserDetailById(id) {
        const sql = `SELECT * FROM UserDetail WHERE id = ?`;
        const params = [id];
        return new Promise((resolve, reject) => {
            sqlite.get(sql, params, (err, row) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`UserDetail ${id} found`);
                    resolve(row);
                }
            });
        });
    }
    getAllUserDetails() {
        const sql = `SELECT * FROM UserDetail`;
        return new Promise((resolve, reject) => {
            sqlite.all(sql, [], (err, rows) => {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`All UserDetails found`);
                    resolve(rows);
                }
            });
        });
    }
    updateUserDetail(id, name, phone, address, access) {
        const sql = `UPDATE UserDetail SET name = ?, phone = ?, address = ?, access = ? WHERE id = ?`;
        const params = [name, phone, address, access, id];
        return new Promise((resolve, reject) => {
            sqlite.run(sql, params, function (err) {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`UserDetail ${id} updated`);
                    resolve(this.changes);
                }
            });
        });
    }
    deleteUserDetail(id) {
        const sql = `DELETE FROM UserDetail WHERE id = ?`;
        const params = [id];
        return new Promise((resolve, reject) => {
            sqlite.run(sql, params, function (err) {
                if (err) {
                    appLog(err.message);
                    reject(err);
                } else {
                    appLog(`UserDetail ${id} deleted`);
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = UserDetail;