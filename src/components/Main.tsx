import type { FC } from 'react';

import styles from './components.module.scss';
import Item from './Item';

interface MainProps {}

const Main: FC<MainProps> = () => {
  return (
    <main className={styles.main}>
      <h2>Saved windows</h2>

      <div className={styles.items}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </main>
  );
};

export default Main;
