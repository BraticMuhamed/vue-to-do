import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toDoList: [],
    toDoInput: "",
  },
  getters: {
    getToDoById: (state) => (id) => {
      return state.toDoList.find((toDo) => toDo.id === id);
    },
    getToDoDone: (state) => (id) => {
      return state.toDoList.find((toDo) => toDo.id === id).isDone;
    },
    getCompletedToDos: (state) => {
      return state.toDoList.filter((toDo) => toDo.isDone);
    },
    getToDos: (state) => {
      return state.toDoList.filter((toDo) => !toDo.isDone);
    },
    getToDoInput: (state) => {
      return state.toDoInput;
    },
  },
  mutations: {
    addToDoItem(state, item) {
      state.toDoList.push({
        task: item,
        id: state.toDoList.length,
        isDone: false,
      });
    },
    setToDoIsDone(state, id) {
      const toDo = state.toDoList.find((toDo) => toDo.id === id);

      toDo.isDone = !toDo.isDone;
    },
    deleteToDo(state, id) {
      const toDoIndex = state.toDoList.findIndex((toDo) => toDo.id === id);

      state.toDoList.splice(toDoIndex, 1);
    },
    editToDo(state, { id, task }) {
      state.toDoList.find((toDo) => toDo.id === id).task = task;
    },
    setToDoInput(state, toDoInput) {
      console.log(toDoInput);
      state.toDoInput = toDoInput;
    },
  },
  actions: {},
  modules: {},
});
