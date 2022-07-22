const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const notesController = require('../Controller/notesController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get(routerConfig.notes.getNotes, authMiddleware, notesController.getNotes);
router.post(routerConfig.notes.addNote, authMiddleware, notesController.addNote);
router.put(routerConfig.notes.updateNote, authMiddleware, notesController.updateNote);
router.put(routerConfig.notes.deleteNote, authMiddleware, notesController.deleteNote);
module.exports = router;
