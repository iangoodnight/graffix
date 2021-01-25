import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import Order from '../../models/Order';
import dbConnect from '../../utils/dbConnect';

const OrderQueue = ({ orders }) => {
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
      <Table headers={headers}>
        {orders.map((order) => (
          <TableRow
            headers={headers}
            data={order}
            key={order._id}
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
  });
  const orders = result.map((doc) => {
    const order = doc.toObject();
    order._id = order._id.toString();
    order.createdAt = new Date(order?.createdAt || null).getDate();
    order.updatedAt = new Date(order?.updatedAt || null).getDate();
    return order;
  });

  return { props: { orders: orders } };
}
export default OrderQueue;
