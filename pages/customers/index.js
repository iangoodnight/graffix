import Link from 'next/link';

import StatusBox from '../../components/StatusBox';
import customerStyles from './customers.module.scss';

const Index = () => {
  let queues = [
    {
      title: 'Active',
      href: '/customers/active',
    },
    {
      title: 'Archived',
      href: '#',
    },
    {
      title: 'Internal',
      href: '#',
    },
  ];

  const statuses = queues.map((queue, i) => {
    return (
      <StatusBox key={i} title={queue.title} href={queue.href}>
        <p>Lorem Ipsum</p>
      </StatusBox>
    );
  });

  return (
    <div className={customerStyles.content}>
      <h1>Customers</h1>
      <Link href="/customers/new">
        <a>
          <button>
            New customer <span>✚</span>
          </button>
        </a>
      </Link>
      {statuses}
    </div>
  );
};

export default Index;
