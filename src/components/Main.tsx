import type { FC } from 'react';

import { IWindow } from '@/utils/helpers';

import Item from './Item';
import styles from './components.module.scss';

interface MainProps {
  savedWindows: IWindow[];
  setSavedWindows: (savedWindows: IWindow[]) => void;
}

const Main: FC<MainProps> = ({ savedWindows, setSavedWindows }) => {
  return (
    <main className={styles.main}>
      <h2>{savedWindows.length ? 'Saved windows' : 'No saved windows'}</h2>

      <div className={styles.items}>
        {savedWindows.map((win, idx) => (
          <Item
            key={idx}
            currWin={win}
            savedWindows={savedWindows}
            setSavedWindows={setSavedWindows}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
