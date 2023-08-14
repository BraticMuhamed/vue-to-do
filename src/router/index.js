import Vue from "vue";
import VueRouter from "vue-router";
import ToDoListView from "@/views/ToDoListView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "to-do-list",
    component: ToDoListView,
  },
  {
    path: "/add-to-do",
    name: "add-to-do",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AddNewToDoView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
