import Link from 'next/link';

import StatusBox from '../../components/StatusBox';
import orderStyles from './orders.module.scss';

const Index = () => {
  let queues = [
    {
      title: 'Order queue',
      href: '/orders/queue',
    },
    {
      title: 'Production',
      href: '/orders/production',
    },
    {
      title: 'Outsourced',
      href: '/orders/outsourced',
    },
    {
      title: 'Archived',
      href: '/orders/archived',
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

export async function getServerSideProps() {}

export default Index;
