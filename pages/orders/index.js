import StatusBox from '../../components/StatusBox.js';

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
    <div>
      <h1>Orders</h1>
      {statuses}
    </div>
  );
};

export default Index;
