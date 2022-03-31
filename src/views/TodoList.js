import { useState, useEffect } from 'react';
import { fetchTodos } from '../services/todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await fetchTodos();
        setTodos(todosData);
        setLoading(false);
      } catch (e) {
        setError('An error has occurred, please try again.');
      }
    };
    fetchData();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>ToDo list!</h1>
      {error && <p>{error}</p>}
      <div className='todos-list'>
        {todos.map((todo) => (
          <h3 key={todo.id}>{todo.description}</h3>
        ))}
      </div>

    </div>
  );
}