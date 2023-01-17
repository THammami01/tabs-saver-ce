import { useEffect, useState } from 'react';

import _styles from './App.scss';

const App = () => {
  // const [currWinTabs, setCurrWinTabs] = useState();

  useEffect(() => {
    (async () => {
      const currWin = await chrome.windows.getCurrent();

      const tabs = await chrome.tabs.query({});
      const currWinTabs = tabs
        .filter((tab) => tab.windowId === currWin.id)
        .map(({ id, favIconUrl, title, url }) => ({
          id,
          favIconUrl,
          title,
          url,
        }));

      chrome.windows.create({
        state: 'maximized',
        url: currWinTabs.map((tab) => tab.url) as string[],
      });
    })();
  }, []);

  return (
    <div>
      <h1>Chrome Tabs SFSFS</h1>
    </div>
  );
};

export default App;
