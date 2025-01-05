import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
const client = generateClient<Schema>();
import "./App.css";

function App() {

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  function createTodo() {
    client.models.Todo.create(
      {     
        machineID: window.prompt("Machine Name"),
        content: window.prompt("Meter Reading")
      });
  }

  const formatToReadableUTC = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
    return `${day} ${month} ${year}, ${hours}:${minutes} UTC`;
  };
  
  return (
    <main>    
      <button onClick={createTodo}>+ new</button> 
      <div className="container">
        <h1 className="header">Meter Readings</h1>
          <div className="grid-container">
            {sortedTodos.map((todo) => (
              <div key={todo.id} className="card">
                <h2 className="card-title">{todo.machineID}</h2>
                <p className="card-content">{todo.content}</p>
                <p className="card-date">{formatToReadableUTC(todo.createdAt)}</p>
              </div>
          ))}
          </div>
      </div>
    </main>
  );
}

export default App;
