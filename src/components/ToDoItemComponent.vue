<template>
  <div class="to-do-item">
    <div>
      <input
        type="checkbox"
        :checked="toDo.isDone"
        @change="setToDoIsDone(toDo.id)"
      />
      <span :class="{ 'text-strike': toDo.isDone }" v-show="!canEdit">{{
        toDo.task
      }}</span>
      <input type="text" v-model="v$.task.$model" v-show="canEdit" />
      <br />
      <strong
        v-for="error of v$.$errors"
        :key="error.$uid"
        class="text error"
        >{{ error.$message }}</strong
      >
      <span v-show="taskEdited" class="text success"
        >Task successfully edited!</span
      >
    </div>
    <div>
      <button @click="onEdit">{{ canEdit ? "Finish" : "Edit" }}</button>
      <button class="delete-button" @click="deleteToDo(toDo.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  props: {
    toDo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      canEdit: false,
      task: this.toDo.task,
      taskEdited: false,
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
    ...mapMutations(["setToDoIsDone", "deleteToDo", "editToDo"]),
    ...mapGetters(["getToDoDone"]),
    async onEdit() {
      if (!this.canEdit) {
        this.canEdit = true;
      } else {
        const isFormCorrect = await this.v$.$validate();

        if (isFormCorrect) {
          this.editToDo({ id: this.toDo.id, task: this.task });
          this.task = "";
          this.v$.$reset();
          this.showTaskEditedMessage();
          this.canEdit = false;
        } else {
          this.taskEdited = false;
        }
      }
    },
    showTaskEditedMessage() {
      this.taskEdited = true;

      return setTimeout(() => {
        this.taskEdited = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.to-do-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 5px;
  margin: 10px;
  border: 1px solid black;
}

.text-strike {
  text-decoration: line-through;
}
</style>
