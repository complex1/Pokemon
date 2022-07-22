const sqlite = require('../Module/sqlite');
const { appLog } = require('../log');

class Notes {
  constructor(user_id, note_name, note_content, note_theme, text_theme, position, note_created_at, note_updated_at) {
    this.user_id = user_id;
    this.note_name = note_name;
    this.note_content = note_content;
    this.note_theme = note_theme;
    this.text_theme = text_theme || '#000000';
    this.position = position || JSON.stringify({ x: 0, y: 0, isOpen: false });
    this.note_created_at = note_created_at;
    this.note_updated_at = note_updated_at;
  }
  addNote() {
    return new Promise((resolve, reject) => {
      sqlite.run(`INSERT INTO Notes (user_id, note_name, note_content, note_theme, text_theme, position, note_created_at, note_updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [this.user_id, this.note_name, this.note_content, this.note_theme, this.text_theme, this.position, this.note_created_at, this.note_updated_at],
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
  getNotes() {
    return new Promise((resolve, reject) => {
      sqlite.all(`SELECT * FROM Notes WHERE user_id = ?`,
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
  updateNote(note_id, note_name, note_content, note_theme, text_theme, position) {
    return new Promise((resolve, reject) => {
      sqlite.run(`UPDATE Notes SET note_name = ?, note_content = ?, note_theme = ?, text_theme = ?, position = ?, note_updated_at = ? WHERE id = ?`,
        [note_name, note_content, note_theme, text_theme, position, new Date(), note_id],
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
  deleteNote(note_id) {
    return new Promise((resolve, reject) => {
      sqlite.run(`DELETE FROM Notes WHERE id = ?`,
        [note_id],
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

module.exports = Notes;
