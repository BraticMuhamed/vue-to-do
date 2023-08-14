<template>
  <div>
    <h3 v-show="!getToDos.length && !getCompletedToDos.length">
      Please, add some ToDo items in the next tab.
    </h3>
    <ul>
      <li v-for="toDo in getToDos" :key="toDo.id">
        <to-do-item-component :toDo="toDo"></to-do-item-component>
      </li>
    </ul>
    <br />
    <h2 v-show="getCompletedToDos.length">Completed ToDos</h2>
    <ul>
      <li v-for="toDo in getCompletedToDos" :key="toDo.id">
        <to-do-item-component :toDo="toDo"></to-do-item-component>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ToDoItemComponent from "@/components/ToDoItemComponent.vue";

export default {
  components: { ToDoItemComponent },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCompletedToDos", "getToDos"]),
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  flex-direction: column;
}
ul {
  width: 50%;
}
li {
  list-style-type: none;
}
</style>
