import './App.css';
import 'normalize.css';
import { ToDo, NavigatorBar } from './components';

const App: React.FC = () => {

  return (
    <div className="App">
      <NavigatorBar />
      <ToDo />
    </div>
  );
}

export default App;