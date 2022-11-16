const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class Task {
  constructor(taskObj) {
    this.created_user = taskObj.created_user
    this.assigne_user = taskObj.assigne_user
    this.title = taskObj.title
    this.detail = taskObj.detail
    this.preority = taskObj.preority
    this.child = taskObj.child
    this.parent = taskObj.parent
    this.type = taskObj.type
    this.state = taskObj.state
    this.completed_at = taskObj.completed_at
    this.done_by = taskObj.completed_at
    this.comments = taskObj.comments
    this.extras = taskObj.extras
    this.task_created_at = new Date()
    this.task_updated_at = new Date()
  }
  createNewTask () {
    return new Promise((resolve, reject) => {
      sqlite.run(`INSERT INTO Task (
        created_user,
        assigne_user,
        title,
        detail,
        preority,
        child,
        parent,
        type,
        state,
        completed_at,
        done_by,
        comments,
        extras,
        task_created_at,
        task_updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          this.created_user, this.assigne_user, this.title,
          this.detail, this.preority, this.child, this.parent,
          this.parent, this.type, this.state, this.completed_at,
          this.done_by, this.comments, this.extras,
          this.task_created_at, this.task_updated_at
        ],
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
  getAllTAsk () {
    return new Promise((resolve, reject) => {
      sqlite.all(`SELECT * FROM TASK`,
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
  getTaskByAssigne () {
    return new Promise((resolve, reject) => {
      sqlite.all(`SELECT * FROM Task WHERE assigne_user = ?`,
        [this.assigne_user],
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
  updateTask (task_id) {
    return new Promise((resolve, reject) => {
      const queryObject = Object.keys(this).map(e => `${e} = ?`).join(', ') + 'WHERE id = ?'
      sqlite.run(`UPDATE Task SET ${queryObject}`,
        [...Object.values(this), task_id],
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
  deleteTask (task_id) {
    return new Promise((resolve, reject) => {
      sqlite.run(`DELETE FROM Task WHERE id = ?`,
        [task_id],
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

module.exports = Task
