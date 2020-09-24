<template>
  <div class="table-responsive table-hover table-borderless table-sm">
    <table class="table">
      <tbody v-if="todos.length > 0">
        <TodoListItem
          v-for="(todo, index) in todos"
          :key="index"
          :todo="todo"
          :index="index"
          :editable="editableChange(index)"
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
      selectedIndex: null,
    }
  },
  methods: {
    editableChange(index) {
      return this.selectedIndex === index;
    },
    onEdit(index) {
      this.selectedIndex = index;
    },
    onCancel() {
      this.selectedIndex = null;
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
