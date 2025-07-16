import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Movie Search</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;