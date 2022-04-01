import { client, checkError } from './client';

export async function fetchTodos() {
  const resp = await client.from('todos').select('*');
  return checkError(resp);
}

export async function createTodo(todo) {
  const resp = await client.from('todos').insert(todo).single();
  return checkError(resp);
}

export async function updateTodo(todo) {
  const resp = await client.from('todos').update(todo).match({ id: todo.id });
  return checkError(resp);
}