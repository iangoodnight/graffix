import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import Order from '../../models/Order';
import dbConnect from '../../utils/dbConnect';

const OrderQueue = ({ orders }) => {
  const headers = [
    { name: 'number', field: 'order_number' },
    { name: 'customer', field: 'customer', hide: true },
    { name: 'product', field: 'product' },
    { name: 'status', field: 'status' },
    { name: 'qty', field: 'label_quantity' },
  ];

  return (
    <div>
      <h1>Order Queue</h1>
      <Table headers={headers}>
        <tbody>
          {orders.map((order) => (
            <TableRow key={order._id} headers={headers} data={order} />
          ))}
        </tbody>
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
    return order;
  });

  return { props: { orders: orders } };
}
export default OrderQueue;
