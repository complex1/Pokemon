const NoteService = require('../Service/noteService');
const NotesController = {}

NotesController.getNotes = (req, res) => {
  const user = req.user;
  NoteService.getNotes(user).then(result => {
    res.send({
      hasError: false,
      data: result
    });
  }
  ).catch(err => {
    res.send({
      hasError: true,
      message: err.message
    });
  }
  )
}

NotesController.addNote = (req, res) => {
  const user = req.user;
  const note = req.body;
  NoteService.addNote(user, note).then(result => {
    res.send({
      hasError: false,
      data: result
    });
  }
  ).catch(err => {
    res.send({
      hasError: true,
      message: err.message
    });
  }
  )
}

NotesController.updateNote = (req, res) => {
  const user = req.user;
  const note = req.body;
  NoteService.updateNote(user, note).then(result => {
    res.send({
      hasError: false,
      data: result
    });
  }
  ).catch(err => {
    res.send({
      hasError: true,
      message: err.message
    });
  }
  )
}

NotesController.deleteNote = (req, res) => {
  const user = req.user;
  const note = req.body;
  NoteService.deleteNote(user, note).then(result => {
    res.send({
      hasError: false,
      data: result
    });
  }
  ).catch(err => {
    res.send({
      hasError: true,
      message: err.message
    });
  }
  )
}

module.exports = NotesController;
