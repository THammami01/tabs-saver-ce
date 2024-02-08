import type { FC } from 'react';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  ITab,
  IWindow,
  getCurrWin,
  getCurrWinTabs,
  saveWindowsInLocalStorage,
} from '@/utils/helpers';

import styles from './components.module.scss';

interface FooterProps {
  savedWindows: IWindow[];
  setSavedWindows: (savedWindows: IWindow[]) => void;
}

const Footer: FC<FooterProps> = ({ savedWindows, setSavedWindows }) => {
  const [winName, setWinName] = useState<string>('');

  const handleWindowNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWinName(e.target.value);

  const handleSaveWindow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!winName) return;

    const currWin = await getCurrWin();
    const currWinTabs = await getCurrWinTabs(currWin.id as number);

    const updatedSavedWindows: IWindow[] = [
      ...savedWindows,
      { id: uuidv4(), name: winName, tabs: currWinTabs as ITab[] },
    ];

    setSavedWindows(updatedSavedWindows);
    saveWindowsInLocalStorage(updatedSavedWindows);
    setWinName('');
  };

  return (
    <footer className={styles.footer}>
      <form onSubmit={handleSaveWindow}>
        <input
          type="text"
          placeholder="Type window name here.."
          value={winName}
          onChange={handleWindowNameChange}
        />

        <button>SAVE</button>
      </form>

      <div className={styles.filler}></div>
    </footer>
  );
};

export default Footer;
