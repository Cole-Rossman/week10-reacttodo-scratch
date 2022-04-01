import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo } from '../services/todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
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
      const newTodo = await createTodo({ description, complete: false });
      setTodos((prevState) => [...prevState, newTodo]);
    } catch (e) {
      setError('An error has occurred, please try again');
    }
  };

  const handleCheckbox = async (todo) => {
    try {
      if (todo.complete === false) {
        const completeTodo = await updateTodo({ id: todo.id, complete: true });
      } else {
        const uncheckTodo = await updateTodo({ id: todo.id, complete: false });
      }
      
    } catch (e) {
      setError('An error occurred, please try again.');
    }
    
    // need to update todo to be completed, after click use linethrough styling. Stretch -- unclick and return status to false.
  };



  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>ToDo list!</h1>
      {error && <p>{error}</p>}
      <div className='todos-list'>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" onClick={() => handleCheckbox(todo)} />
            <h3>{todo.description}</h3>
          </div>
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