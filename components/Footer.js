import footerStyles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div>
          <p>© {new Date().getFullYear().toString()} Ian Goodnight</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
