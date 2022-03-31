import { client, checkError } from './client';

export async function fetchTodos() {
  const resp = await client.from('todos').select('*');
  return checkError(resp);
}

export async function createTodo(todo) {
  const resp = await client.from('todos').insert(todo);
  return checkError(resp);
}