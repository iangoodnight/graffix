import { useRouter } from 'next/router';

import Table from '../../../../components/Table';
import TableRow from '../../../../components/TableRow';
import Order from '../../../../models/Order';
import dbConnect from '../../../../utils/dbConnect';

const OrdersPage = ({ orders }) => {
  const router = useRouter();
  const order_number = router.query.number;
  const headers = [
    { name: 'date', field: 'order_date' },
    { name: 'artwork', field: 'artwork' },
    { name: 'qty', field: 'label_quantity' },
    { name: 'size', field: 'label_dimensions', hide: 'mobile' },
    { name: 'status', field: 'status' },
  ];
  return (
    <div>
      <h1>Order #{order_number}</h1>
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

export async function getServerSideProps({ params }) {
  await dbConnect();

  const results = await Order.find({ order_number: params.number });
  const orders = results.map((doc) => {
    const order = doc.toObject();
    order._id = order._id.toString();
    order.order_date = new Date(
      order?.order_date || order?.createdAt || null
    ).toLocaleDateString();
    if (order.customer) delete order.customer;
    if (order.createdAt) delete order.createdAt;
    if (order.updatedAt) delete order.updatedAt;

    return order;
  });
  return { props: { orders: orders } };
}

export default OrdersPage;
