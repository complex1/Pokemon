const Notes = require('../Model/notes');

const NoteService = {}

NoteService.addNote = (user, note) => {
  const noteModel = new Notes(user.email, note.note_name, note.note_content, note.note_theme, note.text_theme, note.position, new Date(), new Date());
  return new Promise((resolve, reject) => {
    noteModel.addNote().then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

NoteService.getNotes = (user) => {
  const noteModel = new Notes(user.email);
  return new Promise((resolve, reject) => {
    noteModel.getNotes().then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

NoteService.updateNote = (user, note) => {
  const noteModel = new Notes(user.email, note.note_name, note.note_content, note.note_theme, note.text_theme, note.position, new Date(), new Date());
  return new Promise((resolve, reject) => {
    noteModel.updateNote(note.id, note.note_name, note.note_content, note.note_theme, note.text_theme, note.position).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

NoteService.deleteNote = (user, note) => {
  const noteModel = new Notes(user.email);
  return new Promise((resolve, reject) => {
    noteModel.deleteNote(note.id).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = NoteService;
