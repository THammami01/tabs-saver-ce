import { FC, useRef, useState } from 'react';

import { deleteIcon, editIcon, restoreIcon, saveIcon } from '@/assets';
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [winName, setWinName] = useState<string>(currWin.name);
  const inputRef = useRef(null);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleRestoreWindow = async (e: any) => {
    e.stopPropagation();
    await createNewWin(currWin.tabs);
  };

  const handleRenameWindow = (e: any) => {
    e.stopPropagation();
    if (isEditing) {
      if (!winName) {
        (inputRef.current as any).focus();
        return;
      } else {
        // TODO: Update window name in savedWindows
        (inputRef.current as any).blur();

        const updatedSavedWindows = savedWindows.map((win) =>
          win.id === currWin.id ? { ...win, name: winName } : win
        );

        setSavedWindows(updatedSavedWindows);
        saveWindowsInLocalStorage(updatedSavedWindows);
      }
    } else (inputRef.current as any).focus();

    setIsEditing(!isEditing);
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

  const handleWindowNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWinName(e.target.value);

  const handleInputClick = (e: any) => isEditing && e.stopPropagation();

  return (
    <div className={styles.item} onClick={toggleCollapse}>
      <div className={styles.highlight}>
        <input
          type="text"
          value={winName}
          onChange={handleWindowNameChange}
          readOnly={!isEditing}
          ref={inputRef}
          onClick={handleInputClick}
        />

        <div>
          <div className={styles.btn} onClick={handleRestoreWindow}>
            <img src={restoreIcon} alt="Restore" />
          </div>

          <hr />

          <div className={styles.btn} onClick={handleRenameWindow}>
            <img src={isEditing ? saveIcon : editIcon} alt="Rename" />
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
