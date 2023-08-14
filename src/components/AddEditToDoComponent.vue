<template>
  <div>
    <input
      id="to-do-input"
      type="text"
      v-model.lazy="v$.task.$model"
      placeholder="Add a new task"
      class="task-input"
      autocomplete="off"
      @change="setToDoInput(task)"
    />
    <button v-show="!isEdit" @click.stop="addNewToDo">+</button>
    <br />
    <strong v-for="error of v$.$errors" :key="error.$uid" class="text error">{{
      error.$message
    }}</strong>
    <span v-show="taskAdded" class="text success"
      >Task successfully added!</span
    >
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapMutations } from "vuex";

export default {
  props: {
    isEdit: {
      type: Boolean,
      required: false,
    },
    toDoTask: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      taskAdded: false,
      successMessageId: 0,
      task: this.toDoTask ? this.toDoTask : "",
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
    ...mapMutations(["setToDoInput"]),
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
