import { FC, useState } from 'react';

import { deleteIcon, editIcon, restoreIcon } from '@/assets';
import {
  ITab,
  IWindow,
  createNewWin,
  saveWindowsInLocalStorage,
} from '@/utils/extension-fns';

import styles from './components.module.scss';

const MIN_HIGHLIGHT_LENGTH = 36;

interface ItemProps {
  currWin: IWindow;
  savedWindows: IWindow[];
  setSavedWindows: (savedWindows: IWindow[]) => void;
}

const Item: FC<ItemProps> = ({ currWin, savedWindows, setSavedWindows }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleRestoreWindow = async (e: any) => {
    e.stopPropagation();
    await createNewWin(currWin.tabs);
  };

  const handleRenameWindow = (e: any) => {
    e.stopPropagation();
  };

  const handleDeleteWindow = (e: any) => {
    e.stopPropagation();

    const updatedSavedWindows = savedWindows.filter(
      (win) => win.id !== currWin.id
    );

    setSavedWindows(updatedSavedWindows);
    saveWindowsInLocalStorage(updatedSavedWindows);
  };

  const getRenderedHighlightText = (url: string) =>
    url.length > MIN_HIGHLIGHT_LENGTH ? (
      <>
        {url.slice(0, MIN_HIGHLIGHT_LENGTH)}
        <span>...</span>
      </>
    ) : (
      url
    );

  return (
    <div className={styles.item} onClick={toggleCollapse}>
      <div className={styles.highlight}>
        <p className={styles.name}>{currWin.name}</p>

        <div>
          <div className={styles.btn} onClick={handleRestoreWindow}>
            <img src={restoreIcon} alt="Restore" />
          </div>

          <hr />

          <div className={styles.btn} onClick={handleRenameWindow}>
            <img src={editIcon} alt="Rename" />
          </div>

          <div className={styles.btn} onClick={handleDeleteWindow}>
            <img src={deleteIcon} alt="Delete" />
          </div>
        </div>
      </div>

      {isCollapsed && (
        <>
          <hr />

          <div className={styles.links}>
            {currWin.tabs.map((tab: ITab, idx) => (
              <p key={idx} title={`${tab.title} (${tab.url})`}>
                {getRenderedHighlightText(tab.title)}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
