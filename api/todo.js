import axios from 'axios';

export const getTodoById = async (id) => {
  const res = await axios.get(`https://front-end-todo-test.herokuapp.com/todos/${id}`, { params: { key: 'ois-006' } }).catch((err) => err);
  return res.data;
};

export const getTodoList = async () => {
  const res = await axios.get('https://front-end-todo-test.herokuapp.com/todos', { params: { key: 'ois-006' } }).catch((err) => err);
  return res.data;
};

export const addTodo = async ({ title, subject }) => {
  console.log(title);
  console.log(subject);
  const res = await axios.post('https://front-end-todo-test.herokuapp.com/todos', { title, subject }, { params: { key: 'ois-006' } }).catch((err) => err);
  return res.data;
};

export const updateTodo = async ({ id, title, subject }) => {
  const res = await axios.patch(`https://front-end-todo-test.herokuapp.com/todos/${id}`, { title, subject }, { params: { key: 'ois-006' } }).catch((err) => err);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`https://front-end-todo-test.herokuapp.com/todos/${id}`, { params: { key: 'ois-006' } }).catch((err) => err);
  return res.data;
};
