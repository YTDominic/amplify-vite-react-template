import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import QrReader from 'react-qr-scanner'; // Barcode/QR Scanner
import "./App.css";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [scannedData, setScannedData] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);

    
  
  // Observe data changes from DynamoDB
  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    return () => {
      // Clean up subscription on unmount
      subscription.unsubscribe();
    };
  }, []);

  // Sort todos by creation date
  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Create a new Todo item
  function createTodo() {
    const machineID = scannedData;
    const content = window.prompt("Enter Meter Reading") || scannedData;
    if (machineID && content) {
      client.models.Todo.create({
        content: content,
        machineID: scannedData,
      });
    }
  }

  const handleScan = (data: any) => {
    if (data) {
      setScannedData(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

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
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <header className="header">
            <h3>IN4 - Skill City</h3>
            <h3>Welcome, {user?.userId}</h3>
            <button onClick={signOut}>Sign Out</button>
          </header>

          <button onClick={() => setScanning(!scanning)}>
            {scanning ? 'Stop Scanning' : 'Scanning Machine ID'}
          </button>
          <button onClick={createTodo}>Metering input</button>
          {scanning && (
            <QrReader
              delay={500}
              style={{ width: '200px', height: '200px', border: "2px solid black", textAlign: "center" }}
              onError={handleError}
              onScan={handleScan}
            />
          )}

          <div>
            <h3>Scanned Data:</h3>
            <p>{scannedData}</p> {/* Display scanned result here */}
          </div>

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
      )}
    </Authenticator>
  );
}

export default App;
