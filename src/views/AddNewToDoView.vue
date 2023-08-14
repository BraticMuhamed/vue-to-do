<template>
  <div>
    <form>
      <section>
        <label for="to-do-input">ToDo task:</label>
        <input
          id="to-do-input"
          type="text"
          v-model="task"
          placeholder="Add a new task"
          class="task-input"
          autocomplete="off"
        />
        <button @click.prevent="addNewToDo">+</button>
        <br />
        <span v-show="showError" class="text error">Please, add a task.</span>
        <span v-show="taskAdded" class="text success"
          >Task successfully added!</span
        >
      </section>
      <br />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: "",
      showError: false,
      taskAdded: false,
      successMessageId: 0,
    };
  },
  methods: {
    addNewToDo() {
      this.showError = false;
      clearTimeout(this.successMessageId);

      if (this.task) {
        this.$store.commit("addToDoItem", this.task);
        this.successMessageId = this.showTaskAddedMessage();
      } else {
        this.taskAdded = false;
        this.showError = true;
      }
      this.task = "";
    },
    showTaskAddedMessage() {
      this.taskAdded = true;
      return setTimeout(() => {
        this.taskAdded = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.text {
  padding-top: 5px;
  font-size: 12px;
}
.error {
  color: red;
}

.success {
  color: lightgreen;
}

.task-input {
  width: 500px;
  margin: 0 10px;
}
</style>
