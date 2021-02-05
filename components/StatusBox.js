import Link from 'next/link';

import statusBoxStyles from './StatusBox.module.scss';

const StatusBox = ({ title, href, children }) => {
  return (
    <div className={statusBoxStyles.box}>
      <div>
        <h2>
          <Link href={`${href}`}>
            <a>{title}</a>
          </Link>
        </h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default StatusBox;
