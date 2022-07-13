const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class PikachuServer {
  constructor(user_id, name, proto, endpoint, docPath, docVersion, folder_id, folder_name) {
    this.user_id = user_id;
    this.name = name;
    this.proto = proto;
    this.endpoint = endpoint;
    this.docPath = docPath;
    this.docVersion = docVersion;
    this.folder_id = folder_id;
    this.folder_name = folder_name;
    this.server_created_at = new Date();
    this.server_updated_at = new Date();
  }

  addServer() {
    return new Promise((resolve, reject) => {
      sqlite.run(`INSERT INTO PikachuServer (user_id, name, proto, endpoint, docPath, docVersion, folder_id, folder_name, server_created_at, server_updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [this.user_id, this.name, this.proto, this.endpoint, this.docPath, this.docVersion, this.folder_id, this.folder_name, this.server_created_at, this.server_updated_at],
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

  getServers() {
    return new Promise((resolve, reject) => {
      sqlite.all(`SELECT * FROM PikachuServer WHERE user_id = ?`,
        [this.user_id],
        (err, rows) => {
          if (err) {
            appLog(err);
            reject(err);
          } else {
            resolve(rows);
          }
        })
    })
  }

  deleteServer(server_id) {
    return new Promise((resolve, reject) => {
      sqlite.run(`DELETE FROM PikachuServer WHERE id = ?`,
        [server_id],
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

  updateServer(server_id, name, proto, endpoint, docPath) {
    return new Promise((resolve, reject) => {
      sqlite.run(`UPDATE PikachuServer SET name = ?, proto = ?, endpoint = ?, docPath = ?, server_updated_at = ? WHERE id = ?`,
        [name, proto, endpoint, docPath, new Date(), server_id],
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

  getServer(server_id) {
    return new Promise((resolve, reject) => {
      sqlite.get(`SELECT * FROM PikachuServer WHERE id = ?`,
        [server_id],
        (err, row) => {
          if (err) {
            appLog(err);
            reject(err);
          } else {
            resolve(row);
          }
        })
    })
  }

  getServerByFolder(folder_id) {
    return new Promise((resolve, reject) => {
      sqlite.all(`SELECT * FROM PikachuServer WHERE folder_id = ?`,
        [folder_id],
        (err, rows) => {
          if (err) {
            appLog(err);
            reject(err);
          } else {
            resolve(rows);
          }
        })
    })
  }

  deleteServerByFolder(folder_id) {
    return new Promise((resolve, reject) => {
      sqlite.run(`DELETE FROM PikachuServer WHERE folder_id = ?`,
        [folder_id],
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

}

module.exports = PikachuServer;