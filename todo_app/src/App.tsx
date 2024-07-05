import './App.css';
import 'normalize.css';
import { RecoilRoot } from 'recoil';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TodoApp from './pages/TodoApp';

const App: React.FC = () => {
  const CLIENT_ID = '98628226161-bv9dcmu3u2t0q92722868oumpnsntb7v.apps.googleusercontent.com';

  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <TodoApp />
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
}

export default App;