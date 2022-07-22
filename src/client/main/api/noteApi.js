import http from './http'
import config from './config'

export default {
  getNotes (onSuccess, onError) {
    http.get(config.notes.getNotes, onSuccess, onError)
  },
  addNote (note, onSuccess, onError) {
    http.post(config.notes.addNote, onSuccess, onError, note)
  },
  deleteNote (note, onSuccess, onError) {
    http.put(config.notes.deleteNote, onSuccess, onError, note)
  },
  updateNote (note, onSuccess, onError) {
    http.put(config.notes.updateNote, onSuccess, onError, note)
  }
}
