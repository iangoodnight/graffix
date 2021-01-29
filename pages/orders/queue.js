import { useState } from 'react';

import RadioButtons from '../../components/RadioButtons';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import Order from '../../models/Order';
import dbConnect from '../../utils/dbConnect';

const OrderQueue = ({ orders }) => {
  const [activeFilter, setActiveFilter] = useState({
    'in-house': true,
    external: true,
  });

  const [radio, setRadio] = useState({
    checked: 0,
  });

  const headers = [
    { name: 'customer', field: 'customer' },
    { name: 'artwork', field: 'artwork' },
    { name: 'number', field: 'order_number' },
    { name: 'qty', field: 'label_quantity', hide: 'mobile' },
    { name: 'size', field: 'label_dimensions', hide: 'tablet' },
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
      <h1>Order Queue</h1>
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

  /* find all data that matches queue statuses */
  const result = await Order.find({
    status: {
      $in: ['new', 'initial contact', 'rendering', 'pending approval'],
    },
  }).sort([
    ['customer', 1],
    ['order_date', 'asc'],
  ]);
  const orders = result.map((doc) => {
    const order = doc.toObject();
    order._id = order._id.toString();
    order.order_date = new Date(
      order?.order_date || order?.createdAt || null
    ).toLocaleDateString();
    console.log(order.order_date);
    order.createdAt = new Date(order?.createdAt || null).getDate();
    order.updatedAt = new Date(order?.updatedAt || null).getDate();
    if (order.history) {
      delete order.history;
    }
    return order;
  });

  return { props: { orders: orders } };
}
export default OrderQueue;
