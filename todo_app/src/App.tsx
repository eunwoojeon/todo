import './App.css';
import 'normalize.css';
import { RecoilRoot } from 'recoil';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TodoApp from './pages/TodoApp';

const App: React.FC = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;

  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <TodoApp />
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
}

export default App;