import Home from './src/components/Home/Home';
import Store from './src/Store/Store';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={Store}>
      <Home />
    </Provider>
  );
}
