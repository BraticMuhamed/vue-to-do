<template>
  <div>
    <form>
      <section>
        <label for="to-do-input">ToDo task:</label>
        <add-edit-to-do-component></add-edit-to-do-component>
      </section>
      <br />
    </form>
  </div>
</template>

<script>
import AddEditToDoComponent from "@/components/AddEditToDoComponent.vue";

export default {
  components: {
    AddEditToDoComponent,
  },
};
</script>
