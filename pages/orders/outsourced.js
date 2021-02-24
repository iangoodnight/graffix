import { useState } from 'react';

import RadioButtons from '../../components/RadioButtons';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import Order from '../../models/Order';
import dbConnect from '../../utils/dbConnect';

const OutsourcedQueue = ({ orders }) => {
  const [activeFilter, setActiveFilter] = useState({
    'in-house': true,
    external: true,
  });

  const [radio, setRadio] = useState({
    checked: 0,
  });

  const headers = [
    { name: 'customer', field: 'customer', hide: 'mobile' },
    { name: 'artwork', field: 'artwork' },
    { name: 'number', field: 'order_number', hide: 'tablet' },
    { name: 'qty', field: 'label_quantity' },
    { name: 'size', field: 'label_dimensions' },
    { name: 'laminate', field: 'laminate' },
    { name: 'date', field: 'order_date', hide: 'tablet' },
    { name: 'status', field: 'status', hide: 'mobile' },
  ];

  const handleChange = (e) => {
    const index = parseInt(e.target.id.split('-')[1]);
    setRadio({ ...radio, checked: index });
    console.log(activeFilter);
    switch (index) {
      case 0:
        setActiveFilter({
          ...activeFilter,
          ['in-house']: true,
          ['external']: true,
        });
        break;
      case 1:
        setActiveFilter({
          ...activeFilter,
          ['in-house']: true,
          ['external']: false,
        });
        break;
      case 2:
        setActiveFilter({
          ...activeFilter,
          ['in-house']: false,
          ['external']: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Outsourced</h1>
      <RadioButtons
        options={['all orders', ...Object.keys(activeFilter)]}
        radio={radio}
        handleChange={handleChange}
      />
      <Table headers={headers}>
        {orders.map((order, i) =>
          activeFilter['external'] === activeFilter['in-house'] ? (
            <TableRow
              headers={headers}
              data={order}
              key={order._id}
              odd={i % 2 !== 0}
            />
          ) : activeFilter['in-house'] && order.in_house ? (
            <TableRow
              headers={headers}
              data={order}
              key={order._id}
              odd={i % 2 !== 0}
            />
          ) : activeFilter['external'] && !order.in_house ? (
            <TableRow
              headers={headers}
              data={order}
              key={order._id}
              odd={i % 2 !== 0}
            />
          ) : null
        )}
      </Table>
    </div>
  );
};

/* Retrieve order data from mongodb */
export async function getServerSideProps() {
  await dbConnect();

  /* find all data the matches queue statuses */
  const result = await Order.find({
    status: {
      $nin: ['cancelled', 'completed'],
    },
    outsourced: true,
  })
    .populate('customer')
    .sort([['order_date', 'asc']]);
  const orders = result.map((doc) => {
    const order = doc.toObject();
    order._id = order._id.toString();
    order.order_date = new Date(
      order?.order_date || order?.createdAt || null
    ).toLocaleDateString();
    if (order.createdAt) delete order.createdAt;
    if (order.updatedAt) delete order.updatedAt;
    if (order.customer.orders) delete order.customer.orders;
    if (order.history) delete order.history;
    order.customer._id = order.customer._id.toString();

    return order;
  });

  return { props: { orders: orders } };
}

export default OutsourcedQueue;
