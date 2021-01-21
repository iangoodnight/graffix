import Link from 'next/link';

import ActiveLink from './ActiveLink.js';
import headerStyles from './Header.module.scss';

const Header = () => {
  return (
    <header className={headerStyles.main}>
      <div className={headerStyles['header-container']}>
        <div className={headerStyles['global-search']}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <div className={headerStyles['hero-content']}>
          <h1>
            <Link href="/">
              <a>Graffix</a>
            </Link>
          </h1>
          <p>...because every app needs a funny name</p>
        </div>
        <nav>
          <ul>
            <li>
              <ActiveLink href="/dashboard">
                <a className={headerStyles['active-link']}>Dashboard</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/orders">
                <a className={headerStyles['active-link']}>Orders</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/customers">
                <a className={headerStyles['active-link']}>Customers</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/account">
                <a className={headerStyles['active-link']}>Account</a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
