const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class PikachuFolder {
  constructor(user_id, folder_name) {
    this.user_id = user_id;
    this.folder_name = folder_name;
    this.folder_created_at = new Date();
    this.folder_updated_at = new Date();
  }
  addFolder() {
    return new Promise((resolve, reject) => {
      sqlite.run(`INSERT INTO PikachuFolder (user_id, folder_name, folder_created_at, folder_updated_at) VALUES (?, ?, ?, ?)`,
        [this.user_id, this.folder_name, this.folder_created_at, this.folder_updated_at],
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
  getFolders() {
    return new Promise((resolve, reject) => {
      sqlite.all(`SELECT * FROM PikachuFolder WHERE user_id = ?`,
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

  getFolderById (folder_id) {
    return new Promise((resolve, reject) => {
      sqlite.get(`SELECT * FROM PikachuFolder WHERE id = ?`,
        [folder_id],
        function (err, data) {
          if (err) {
            appLog(err);
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  }

  deleteFolder(folder_id) {
    return new Promise((resolve, reject) => {
      sqlite.run(`DELETE FROM PikachuFolder WHERE id = ?`,
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

module.exports = PikachuFolder;