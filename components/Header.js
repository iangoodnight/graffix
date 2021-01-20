import Link from 'next/link';

import headerStyles from './Header.module.scss';

const Header = () => {
  return (
    <header className={headerStyles.main}>
      <div className={headerStyles['header-container']}>
        <h1>
          <Link href="/">
            <a>Graffix</a>
          </Link>
        </h1>
        <p>...because every app needs a funny name</p>
        <nav>
          <ul>
            <li>Menu</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
