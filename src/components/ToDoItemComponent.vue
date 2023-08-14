<template>
  <div class="to-do-item">
    <div class="input-wrapper">
      <input
        type="checkbox"
        :checked="toDo.isDone"
        @change="setToDoIsDone(toDo.id)"
      />
      <span :class="{ 'text-strike': toDo.isDone }" v-show="!canEdit">{{
        toDo.task
      }}</span>
      <add-edit-to-do-component
        v-show="canEdit"
        :is-edit="true"
        :to-do-task="task"
      ></add-edit-to-do-component>
    </div>
    <div>
      <button @click="onEdit">{{ canEdit ? "Finish" : "Edit" }}</button>
      <button class="delete-button" @click="deleteToDo(toDo.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import AddEditToDoComponent from "@/components/AddEditToDoComponent.vue";

export default {
  components: {
    AddEditToDoComponent,
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
  methods: {
    ...mapMutations(["setToDoIsDone", "deleteToDo", "editToDo"]),
    ...mapGetters(["getToDoDone", "getToDoInput"]),
    onEdit() {
      if (!this.canEdit) {
        this.canEdit = true;
      } else {
        console.log(this.getToDoInput());
        this.editToDo({ id: this.toDo.id, task: this.getToDoInput() });
        this.canEdit = false;
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

.input-wrapper {
  display: flex;
}
</style>
