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
      <input type="text" v-model="task" v-show="canEdit" />
    </div>
    <div>
      <button @click="onEdit">{{ canEdit ? "Finish" : "Edit" }}</button>
      <button class="delete-button" @click="deleteToDo(toDo.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
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
    };
  },
  methods: {
    ...mapMutations(["setToDoIsDone", "deleteToDo", "editToDo"]),
    ...mapGetters(["getToDoDone"]),
    onEdit() {
      if (!this.canEdit) {
        this.canEdit = true;
      } else {
        this.editToDo({ id: this.toDo.id, task: this.task });
      }
    },
  },
  // computed: {
  //   isToDoChecked() {
  //     return this.toDo.isDone;
  //   },
  // },
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
