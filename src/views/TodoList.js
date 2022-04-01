import { useState, useEffect } from 'react';
import { fetchTodos, createTodo } from '../services/todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [complete, setComplete] = useState(false);
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

  const handleSubmit = async () => {
    try {
      const newTodo = await createTodo({ description, complete });
      setTodos((prevState) => [...prevState, newTodo]);
    } catch (e) {
      setError('An error has occurred, please try again');
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>ToDo list!</h1>
      {error && <p>{error}</p>}
      <div className='todos-list'>
        {todos.map((todo) => (
          <h3 key={todo.id}>{todo.description}</h3>
        ))}
        <div className='new-todo'>
          <label>
            New Todo:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSubmit}>Save</button>
          </label>
        </div>
      </div>

    </div>
  );
}