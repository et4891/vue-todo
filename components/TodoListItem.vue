<template>
  <tr>
    <td class="col-8">
      <!-- if editable is true, show the checkbox and todo item -->
      <div class="custom-control custom-checkbox" v-if="!editable">
        <input
          type="checkbox"
          class="custom-control-input"
          :id="'checkbox-' + todoId"
          @click="onCheck"
          :checked="todo.completed"
        >
        <label
          class="custom-control-label clickable"
          :class="{ isCompleted: todo.completed }"
          :for="'checkbox-' + todoId"
        >
          {{ todo.item }}
        </label>
      </div>

      <!-- if editable is false, turn item into an input so user can enter new value -->
      <div v-else>
        <input type="text" class="form-control" :value="todo.item" @input="onInput">
      </div>
    </td>
    <td class="col-2">
      <button
        class="btn btn-sm"
        :class="editable ? 'btn-outline-success' : 'btn-outline-info'"
        @click.prevent="onModify">{{ editable ? 'save' : 'edit' }}
      </button>
    </td>
    <td class="col-2">
      <button
          class="btn btn-sm btn-outline-danger"
          @click.prevent="editable ? onCancel() : onRemove()"
      >{{ editable ? 'Cancel' : 'X' }}</button>
    </td>
  </tr>
</template>

<script>
import TodoApi from '../api/Todo';

export default {
  name: 'TodoListItem',
  props: ['todo'],
  data() {
    return {
      editable: false,
      itemEdited: null,
    }
  },
  computed: {
    todoId() {
      return this.todo.id || this.todo._id;
    }
  },
  methods: {
    async onCheck() {
      try {
        const response = await TodoApi.completed({
          _id: this.todoId,
          completed: !this.todo.completed,
        });
        if (response.data.status) {
          this.todo.completed = !this.todo.completed;
        }
      } catch (e) {
        console.log(e, 'todolistitem oncheck');
      }
    },
    onInput(e) {
      this.itemEdited = e.target.value;
    },
    async onModify() {
      // if editable is true, call api to save
      if (this.editable) {
        try {
          await TodoApi.edit({
            _id: this.todoId,
            item: this.itemEdited,
          });
          this.todo.item = this.itemEdited;
        } catch (e) {
          console.log(e, 'onModify in todolistitem');
        }
      }

      this.editable = !this.editable;
    },
    onCancel() {
      this.editable = !this.editable;
    },
    onRemove() {
      this.$emit('onRemoveEmit', this.todoId);
    }
  }
}
</script>

<style scoped>
  .isCompleted {
    text-decoration: line-through;
  }

  .clickable {
    cursor: pointer !important;
  }
</style>
