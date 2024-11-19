import './App.css';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';


function App() {
  return (
    <div className="App">
      <h1>Employee Portal</h1>
      <CreateUser />
      <UserList />
    </div>
  );
}

export default App;
