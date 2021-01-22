import Link from 'next/link';

import StatusBox from '../../components/StatusBox.js';
import orderStyles from './orders.module.scss';

const Index = () => {
  let queues = [
    {
      title: 'Order queue',
      href: 'queue',
    },
    {
      title: 'Production',
      href: 'production',
    },
    {
      title: 'Outsourced',
      href: 'outsourced',
    },
    {
      title: 'On hold',
      href: 'hold',
    },
    {
      title: 'Archived',
      href: 'completed',
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
    <div className={orderStyles.content}>
      <h1>Orders</h1>
      <Link href="/orders/new">
        <a>
          <button>
            New order <span>✚</span>
          </button>
        </a>
      </Link>
      {statuses}
    </div>
  );
};

export default Index;
