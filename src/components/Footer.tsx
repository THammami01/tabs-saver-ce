import type { FC } from 'react';
import { useState } from 'react';

import styles from './components.module.scss';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const [windowName, setWindowName] = useState<string>('');

  const handleWindowNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWindowName(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className={styles.footer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type window name here.."
          value={windowName}
          onChange={handleWindowNameChange}
        />
        <button>SAVE</button>
      </form>

      <div className={styles.filler}></div>
    </footer>
  );
};

export default Footer;
