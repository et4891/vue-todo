<template>
  <div class="container">
    <TodoInput
      @onAddEmit="onAdd"
    />

    <!-- add loader -->
    <div v-if="!todos">
      <p class="loader"></p>
    </div>
    <TodoList
      v-else
      :todos="todos"
      @onRemoveEmit="onRemove"
    />
  </div>
</template>

<script>
import TodoApi from '../api/Todo';

import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

export default {
  name: 'App',
  data() {
    return {
      todos: null,  // using null to start with which will get the loader going
    }
  },
  components: {
    TodoInput,
    TodoList
  },
  methods: {
    async onAdd(item) {
      try {
        const response = await TodoApi.create({ item });
        this.todos = [ ...this.todos, response.data.data ];
      } catch (e) {
        console.log(e, 'error in App onAdd');
      }
    },
    async onRemove(id) {
      try {
        const response = await TodoApi.remove(id);
        if(response.data.status){
          this.todos = this.todos.filter(todo => todo._id !== id);
        }
      } catch (e) {
          console.log(e, 'App onRemove error');
      }
    },
  },
  async created() {
    try {
      const response = await TodoApi.list();
      this.todos = response.data.data;
    } catch (e) {
      console.log(e, 'error in App create');
    }
  }
}
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
