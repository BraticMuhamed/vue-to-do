<template>
  <div>
    <form>
      <section>
        <label for="to-do-input">ToDo task:</label>
        <input
          id="to-do-input"
          type="text"
          v-model="v$.task.$model"
          placeholder="Add a new task"
          class="task-input"
          autocomplete="off"
        />
        <button @click.stop="addNewToDo">+</button>
        <br />
        <strong
          v-for="error of v$.$errors"
          :key="error.$uid"
          class="text error"
          >{{ error.$message }}</strong
        >
        <span v-show="taskAdded" class="text success"
          >Task successfully added!</span
        >
      </section>
      <br />
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      task: "",
      taskAdded: false,
      successMessageId: 0,
    };
  },
  validations() {
    return {
      task: {
        required,
        minLength: minLength(3),
        lazy: true,
      },
    };
  },
  methods: {
    async addNewToDo() {
      clearTimeout(this.successMessageId);

      const isFormCorrect = await this.v$.$validate();

      if (isFormCorrect) {
        this.$store.commit("addToDoItem", this.task);
        this.successMessageId = this.showTaskAddedMessage();
        this.task = "";
        this.v$.$reset();
      } else {
        this.taskAdded = false;
      }
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
.task-input {
  width: 500px;
  margin: 0 10px;
}
</style>
