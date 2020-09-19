import axios from 'axios';

// const BASE_URL = 'https://express-tutorial-api.herokuapp.com';
const BASE_URL = 'http://localhost:3001';
const TODO_PATH = '/api/todo'

/*
 * NOTE: somehow axios version 20's delete method cannot pass data attribute so downgraded to 19.2
 * */
export default {
  list: () => axios.get(`${ BASE_URL }${TODO_PATH}`),
  create: todo => axios.post(`${ BASE_URL }${TODO_PATH}`, todo),
  remove: _id => axios.delete(`${ BASE_URL }${ TODO_PATH }`, { data: { _id } }),

  completed: ({ _id, completed }) => axios.patch(`${ BASE_URL }${TODO_PATH}/completed`, { _id, completed }),
  edit: ({ _id, item }) => axios.patch(`${ BASE_URL }${TODO_PATH}/${_id}`, { item }),
};
