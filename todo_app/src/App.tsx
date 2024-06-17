import './App.css';
import 'normalize.css';
import { TodoApp, NavigatorBar } from './components';
import { RecoilRoot } from 'recoil';

const App: React.FC = () => {

  return (
    <RecoilRoot>
      <NavigatorBar />
      <TodoApp />
    </RecoilRoot>
  );
}

export default App;