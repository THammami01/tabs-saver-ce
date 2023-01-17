import { FC, useState } from 'react';

import { deleteIcon, editIcon, restoreIcon } from '@/assets';

import styles from './components.module.scss';
import {
  ITab,
  createNewWin,
  getCurrWin,
  getCurrWinTabs,
} from '@/utils/extension-fns';

interface ItemProps {}

const Item: FC<ItemProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleRestoreWindow = async (e: any) => {
    e.stopPropagation();

    const currWin = await getCurrWin();
    const currWinTabs = await getCurrWinTabs(currWin.id as number);
    await createNewWin(currWinTabs as ITab[]);
  };

  const handleRenameWindow = (e: any) => {
    e.stopPropagation();
  };

  const handleDeleteWindow = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.item} onClick={toggleCollapse}>
      <div className={styles.highlight}>
        <p className={styles.name}>Saved Window 01</p>

        <div>
          <div
            className={styles.btn}
            onClick={handleRestoreWindow}
            // title="Restore"
          >
            <img src={restoreIcon} alt="Restore" />
          </div>

          <hr />

          <div
            className={styles.btn}
            onClick={handleRenameWindow}
            // title="Rename"
          >
            <img src={editIcon} alt="Rename" />
          </div>

          <div
            className={styles.btn}
            onClick={handleDeleteWindow}
            // title="Delete"
          >
            <img src={deleteIcon} alt="Delete" />
          </div>
        </div>
      </div>

      {isCollapsed && (
        <>
          <hr />

          <div className={styles.links}>
            <p>1. https://tarekhammami.me/</p>
            <p>2. https://tarekhammami.me/</p>
            <p>3. https://tarekhammami.me/</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
