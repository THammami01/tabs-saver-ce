import { useEffect } from 'react';

import _styles from './App.module.scss';
import { Footer, Header, Main } from './components';

const App = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
