import './App.css';
import 'normalize.css';
import { TodoApp, NavigatorBar } from './components';

const App: React.FC = () => {

  return (
    <div className="App">
      <NavigatorBar />
      <TodoApp />
    </div>
  );
}

export default App;