<template>
  <Popper>
    <img class="notes-logo" src="@image/Pidgeot.webp" alt="chat" />
    <template #content>
      <div class="notes">
        <nav>
          <h3>Notes</h3>
          <p-btn color="teal" @click="addNewNote"> Add New Note </p-btn>
        </nav>
        <div
          class="notes-list"
          v-for="note in notes"
          :key="note.id"
          :style="{
            color: note.text_theme,
            backgroundColor: notesColorMap[note.note_theme],
          }"
          @click="openNote(note)"
        >
          {{ note.note_name }}
          <div class="notes-list-action">
            <div class="fa fa-pen" @click="editNote(note)"></div>
            <div class="fa fa-trash" @click="deleteNote(note)"></div>
          </div>
        </div>
      </div>
    </template>
  </Popper>
  <div class="notes-modal overlay" v-if="notesModal">
    <div class="notes-modal-content p-3">
      <div class="notes-modal-header v-center">
        <h3>Add New Note</h3>
      </div>
      <div class="notes-modal-body">
        <div class="notes-modal-body-content">
          <div class="p-input mt-4">
            <input type="text" v-model="noteObj.note_name" class="block" />
            <label>Title</label>
          </div>
          <div class="p-input mt-4">
            <textarea
              type="text"
              v-model="noteObj.note_content"
              class="block"
              rows="5"
            />
            <label>Content</label>
          </div>
          <div class="notes-modal-body-content--theme">
            <p class="mt-3">Theme</p>
            <div class="v-center mt-2 wrap">
              <div
                class="color-box mr-2 mb-2"
                v-for="(value, color) in notesColorMap"
                :key="color"
                :style="{ background: value }"
                @click="noteObj.note_theme = color"
                :class="{ active: noteObj.note_theme === color }"
              ></div>
            </div>
          </div>
          <div class="notes-modal-body-content--theme">
            <p class="mt-3">Text Theme</p>
            <div class="v-center mt-2 wrap">
              <div
                class="color-box mr-2 mb-2"
                v-for="value in ['#eee', '#333']"
                :key="value"
                :style="{ background: value }"
                @click="noteObj.text_theme = value"
                :class="{ active: noteObj.text_theme === value }"
              ></div>
            </div>
          </div>
        </div>
        <div class="notes-modal-body-footer v-center">
          <p-btn color="red" light @click="notesModal = false">Close</p-btn>
          <p-btn color="green" class="ml-2" light @click="saveNote">Save</p-btn>
        </div>
      </div>
    </div>
  </div>
  <fb-window
    v-for="note in notes"
    :key="note.id"
    :h="note.position.h"
    :w="note.position.w"
    :x="note.position.x"
    :y="note.position.y"
    :title="note.note_name"
    @change="changePosition($event, note)"
    @close="closeNote(note)"
    v-show="note.position.isOpen"
  >
    <div
      class="notes-content"
      :style="{ background: notesColorMap[note.note_theme], color: note.text_theme }"
    >
      <h3>{{ note.note_name }}</h3>
      <p>{{ note.note_content }}</p>
    </div>
  </fb-window>
</template>

<script>
import Popper from "vue3-popper";
import PBtn from "../swagger/PBtn.vue";
import FbWindow from "../common/fbWindow.vue";
import { notesColorMap } from "@/constant";
import noteApi from "@/api/noteApi";

export default {
  name: "Notes",
  components: {
    Popper,
    PBtn,
    FbWindow,
  },
  data() {
    return {
      notes: [],
      notesModal: false,
      notesColorMap,
      noteObj: {
        id: null,
        note_name: "",
        note_content: "",
        note_theme: "default",
        text_theme: "#eee",
        position: {
          x: 100,
          y: 100,
          h: 200,
          w: 200,
          isOpen: false,
        },
      },
    };
  },
  methods: {
    changePosition (position, note) {
      const tempNote = JSON.parse(JSON.stringify(note));
      tempNote.position = JSON.stringify(position);
      noteApi.updateNote(tempNote);
    },
    closeNote (note) {
      const tempNote = JSON.parse(JSON.stringify(note));
      tempNote.position.isOpen = false;
      tempNote.position = JSON.stringify(tempNote.position);

      noteApi.updateNote(
          tempNote,
          (res) => {
            const index = this.notes.findIndex(
              (item) => item.id === tempNote.id
            );
            res.data.position = JSON.parse(res.data.position);
            this.notes[index] = { ...tempNote, ...res.data };
          },
          (err) => {
            console.log(err);
          }
        );
    },
    openNote (note) {
      const tempNote = JSON.parse(JSON.stringify(note));
      tempNote.position.isOpen = true;
      tempNote.position = JSON.stringify(tempNote.position);

      noteApi.updateNote(
          tempNote,
          (res) => {
            const index = this.notes.findIndex(
              (item) => item.id === tempNote.id
            );
            res.data.position = JSON.parse(res.data.position);
            this.notes[index] = { ...tempNote, ...res.data };
          },
          (err) => {
            console.log(err);
          }
        );
    },
    resetNoteForm() {
      this.noteObj = {
        id: null,
        note_name: "",
        note_content: "",
        note_theme: "default",
        text_theme: "#eee",
        position: {
          x: 0,
          y: 0,
          h: 200,
          w: 200,
          isOpen: false,
        },
      };
    },
    addNewNote() {
      this.notesModal = true;
    },
    getAllNotes() {
      noteApi.getNotes(
        (res) => {
          this.notes = res.data;
          this.notes.forEach((note) => {
            note.position = JSON.parse(note.position);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    editNote(note) {
      this.noteObj = { ...note };
      this.notesModal = true;
    },
    deleteNote(note) {
      noteApi.deleteNote(
        note,
        () => {
          this.getAllNotes();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    saveNote() {
      const noteObj = { ...this.noteObj };
      noteObj.position = JSON.stringify(noteObj.position);
      if (noteObj.id) {
        noteApi.updateNote(
          noteObj,
          (res) => {
            const index = this.notes.findIndex(
              (item) => item.id === noteObj.id
            );
            res.data.position = JSON.parse(res.data.position);
            this.notes[index] = { ...noteObj, ...res.data };
            this.notesModal = false;
            this.resetNoteForm();
          },
          (err) => {
            console.log(err);
            this.notesModal = false;
          }
        );
      } else {
        noteApi.addNote(
          noteObj,
          (res) => {
            res.data.position = JSON.parse(res.data.position);
            this.notes.push(res.data);
            this.notesModal = false;
            this.resetNoteForm();
          },
          (err) => {
            console.log(err);
            this.notesModal = false;
          }
        );
      }
    },
  },
  created() {
    console.log("Notes created");
    this.getAllNotes();
  },
};
</script>

<style lang="scss" scoped>
.notes-logo {
  height: 30px;
  margin-right: 10px;
}
.notes {
  background: white;
  padding: 10px;
  width: 400px;
  max-height: 600px;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 18px;
      font-weight: bold;
      color: var(--blue-color);
    }
    button {
      font-size: 12px;
    }
  }
  &-list {
    position: relative;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-top: 14px;
    font-size: 12px;
    font-weight: 400;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
      & .notes-list-action {
        transform: scaleX(1);
      }
    }
    &-action {
      position: absolute;
      transition: transform 0.3s ease-in-out;
      transform-origin: right;
      transform: scaleX(0);
      right: 0px;
      top: 0px;
      bottom: 0px;
      width: 60px;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      backdrop-filter: blur(5px);
      .fa {
        font-size: 14px;
        cursor: pointer;
        margin: 0px 5px;
        &.fa-pen {
          color: green;
          margin-left: 10px;
        }
        &.fa-trash {
          color: red;
        }
      }
    }
  }
  &-modal {
    &-content {
      width: 500px;
    }
    &-header {
      color: var(--blue-color);
      font-weight: bold;
    }
    &-body-content--theme {
      p {
        font-size: 14px;
        color: var(--black-color);
      }
      .color-box {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.4);
        &.active {
          box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.8);
        }
      }
    }
    &-body-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 10px;
      button {
        font-size: 12px;
        width: 80px;
      }
    }
  }
  &-content {
    padding: 16px;
    border-radius: 8px;
    height: 100%;
    overflow-y: auto;
    h3 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      font-family: monospace;
    }
  }
}
</style>