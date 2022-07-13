<template>
  <div class="swagger">
    <div class="container folder">
      <nav class="v-center space-between">
        <h3>Projects</h3>
        <p-btn color="orange" @click="overlay = true"> ADD NEW PROJECT</p-btn>
      </nav>
      <div class="projects">
        <div class="project" v-for="project in folders" :key="project.id">
          <h3>{{ project.folder_name }}</h3>
          <div class="flex">
            <p-btn
              class="tx-x-small mr-3"
              light
              color="red"
              @click="deleteProject(project.id)"
            >
              Delete</p-btn
            >
            <p-btn
              class="tx-x-small"
              light
              color="indigo"
              @click="openProject(project.id)"
            >
              Open</p-btn
            >
          </div>
        </div>
      </div>
      <div class="overlay" v-if="overlay">
        <section>
          <h2 class="tx-lg tx-light mb-3">Add New Project</h2>
          <div class="p-input my-4">
            <input
              type="text"
              class="block"
              v-model="newProjectName"
              title="Server Name"
            />
            <label>Project Name</label>
          </div>
          <div class="flex flex-end mt-5 tx-x-small">
            <p-btn class="mr-3" color="red" @click="overlay = false">
              CANCEL</p-btn
            >
            <p-btn color="green" @click="addProject">ADD</p-btn>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PBtn from "../components/swagger/PBtn.vue";
export default {
  name: "Swagger",
  components: { PBtn },
  data() {
    return {
      overlay: false,
      newProjectName: "",
    };
  },
  computed: {
    ...mapState("swagger", ["folders"]),
  },
  methods: {
    addProject() {
      if (this.newProjectName.length > 0) {
        this.$store.dispatch("swagger/addFolder", this.newProjectName);
        this.newProjectName = "";
        this.overlay = false;
      }
    },
    deleteProject(id) {
      this.$store.dispatch("swagger/deleteFolder", id);
    },
    openProject(id) {
      this.$router.push(`/pikachu/project/${id}`);
    },
  },
  created() {
    this.$store.dispatch("swagger/getFolders");
  },
};
</script>

<style lang="scss" scoped>
.swagger {
  background: rgb(255, 255, 255);
  height: calc(100vh - 30px);
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}
.folder {
  nav {
    h3 {
      font-size: 24px;
      font-weight: bold;
      color: var(--black-color);
    }
  }
  .overlay section {
    background: var(--white-color);
    border-radius: 8px;
    padding: 20px;
    width: 300px;
  }
}
.project {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: rgb(235, 235, 235);
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  h3 {
    font-size: 16px;
    color: var(--black-color);
    cursor: pointer;
    &:hover {
      color: var(--blue-color);
    }
  }
}
</style>