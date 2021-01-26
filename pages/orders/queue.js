import { useState } from 'react';
import RadioButtons from '../../components/RadioButtons';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import Order from '../../models/Order';
import dbConnect from '../../utils/dbConnect';

const OrderQueue = ({ orders }) => {
  const [activeFilter, setActiveFilter] = useState({
    'in-house': true,
    'external': true,
  });

  const headers = [
    { name: 'customer', field: 'customer' },
    { name: 'number', field: 'order_number' },
    { name: 'artwork', field: 'artwork' },
    { name: 'status', field: 'status' },
    { name: 'qty', field: 'label_quantity' },
  ];

  return (
    <div>
      <h1>Order Queue</h1>
      <RadioButtons options={['all orders',
        ...Object.keys(activeFilter)]} />
      <Table headers={headers}>
        {orders.map((order, i) => (
          <TableRow
            headers={headers}
            data={order}
            key={order._id}
            odd={i % 2 !== 0}
          />
        ))}
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
  }).sort({ customer: 1 });
  const orders = result.map((doc) => {
    const order = doc.toObject();
    order._id = order._id.toString();
    order.order_date = new Date(order?.order_date || null).getDate();
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
