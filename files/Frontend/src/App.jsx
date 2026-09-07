import { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/todos`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load todos.');
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        setError('');
      })
      .catch(() => setError('Connect the FastAPI backend to load your todos.'));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      if (!response.ok) {
        setError('Could not add the todo.');
        return;
      }
      const newTodo = await response.json();
      setTodos((prev) => [newTodo, ...prev]);
      setInput('');
      setError('');
    } catch (err) {
      setError('Could not add the todo.');
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (response.ok) {
        setTodos((prev) =>
          prev.map((item) => (item.id === todo.id ? { ...item, completed: !item.completed } : item))
        );
        setError('');
      } else {
        setError('Could not update the todo.');
      }
    } catch (err) {
      setError('Could not update the todo.');
    }
  };

  const deleteTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${todo.id}`, { method: 'DELETE' });
      if (response.ok) {
        setTodos((prev) => prev.filter((item) => item.id !== todo.id));
        setError('');
      } else {
        setError('Could not delete the todo.');
      }
    } catch (err) {
      setError('Could not delete the todo.');
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">REACT TODO APP</h1>
        {error && <p role="alert" className="error">{error}</p>}

        {/* Input Controls */}
        <form className="input-group" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>

        {/* Todo List */}
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <button onClick={() => deleteTodo(todo)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}