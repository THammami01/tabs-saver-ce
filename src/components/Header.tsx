import type { FC } from 'react';

import { github } from '@/assets';

import styles from './components.module.scss';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const handleOpenGitHubRepo = () =>
    window.open('https://github.com/THammami01/tabs-saver-ce', '_blank');

  return (
    <header className={styles.header}>
      <h1>Chrome Tabs Saver</h1>
      <img src={github} alt="GitHub" onClick={handleOpenGitHubRepo} />
    </header>
  );
};

export default Header;
