<template>
  <tr>
    <td class="col-8">
      <!-- if editable is false, show the checkbox and todo item -->
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

      <!-- if editable is true, turn item into an input so user can enter new value -->
      <div v-else>
        <input ref="editItem" type="text" class="form-control" :value="todo.item" @input="onInput">
      </div>
    </td>
    <td class="col-2">
      <button
        class="btn btn-sm"
        :class="editable ? 'btn-outline-success' : 'btn-outline-info'"
        @click.prevent="editable ? onSave() : onEdit()">{{ editable ? 'save' : 'edit' }}
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
  props: ['todo', 'index', 'editable'],
  data() {
    return {
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
    onEdit() {
      if (!this.editable) {
        this.$emit('onEditEmit', this.index);
        // using $nextTick() because it allows you to do something after you have changed the data and VueJS has updated the DOM based on your data change,
        // but before the browser has rendered those changed on the page.
        // if familiar with jQuery, it's same reason why the need to use $('elements').on('click'),  instead of just using $('element').click()
        // in this example, without using $nextTick() browser will see this.editable as false instead of true
        this.$nextTick(() => this.$refs.editItem.focus());
      }
    },
    async onSave() {
      // if editable is true, and item call api to save
      const item = this.itemEdited || this.todo.item;
      if (this.editable && item) {
        try {
          await TodoApi.edit({
            _id: this.todoId,
            item,
          });
          this.todo.item = item;
          this.onCancel();  // calling this here because this actually set the selectIndex back to null, which is what is needed
        } catch (e) {
          console.log(e, 'onModify in todolistitem');
        }
      }
    },
    onCancel() {
      this.$emit('onCancelEmit');
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
