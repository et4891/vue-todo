<template>
  <div class="table-responsive table-hover table-borderless table-sm">
    <table class="table">
      <tbody v-if="todos.length > 0">
        <TodoListItem
          v-for="(todo, index) in todos"
          :key="index"
          :todo="todo"
          :editable="editableChange(todo._id)"
          @onRemoveEmit="onRemove"
          @onCancelEmit="onCancel"
          @onEditEmit="onEdit"
        />
      </tbody>
      <tbody v-else>
        <tr><td class="text-center">No items YET</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem'

export default {
  name: 'TodoList',
  props: ['todos'],
  components: {
    TodoListItem
  },
  data() {
    return {
      selectedItem: null,
    }
  },
  methods: {
    editableChange(id) {
      return this.selectedItem === id;
    },
    onEdit(id) {
      this.selectedItem = id;
    },
    onCancel() {
      this.selectedItem = null;
    },
    onRemove(id) {
      this.$emit('onRemoveEmit', id);
    }
  }
}
</script>

<style scoped>
  .table {
    width: 90%;
    margin: auto;
  }
</style>
