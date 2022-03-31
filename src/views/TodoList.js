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
        setError('An error has occured, please try again.');
      }
    };
    fetchData();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>todoList</div>
  );
}