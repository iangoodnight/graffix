import Footer from './Footer.js';
import Header from './Header.js';
import layoutStyles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header />
        <div className={layoutStyles['main-content']}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
