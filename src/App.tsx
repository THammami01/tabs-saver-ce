import { useEffect, useState } from 'react';

import { Footer, Header, Main } from './components';
import { IWindow } from './utils/helpers';

const App = () => {
  const [savedWindows, setSavedWindows] = useState<IWindow[]>([]);

  useEffect(() => {
    chrome.storage.local.get(['savedWindows'], ({ savedWindows }) =>
      setSavedWindows(JSON.parse(savedWindows))
    );
  });

  return (
    <div>
      <Header />
      <Main savedWindows={savedWindows} setSavedWindows={setSavedWindows} />
      <Footer savedWindows={savedWindows} setSavedWindows={setSavedWindows} />
    </div>
  );
};

export default App;
