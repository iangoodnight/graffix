import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import Order from '../../models/Order';
import dbConnect from '../../utils/dbConnect';

const ProductionQueue = ({ orders }) => {
  const headers = [
    { name: 'number', field: 'order_number' },
    { name: 'product', field: 'product', hide: true },
    { name: 'laminate', field: 'laminate' },
    { name: 'qty', fiels: 'label_quantity' },
  ];

  return (
    <div>
      <h1>Production Queue</h1>
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

  /* find all data the matches queue statuses */
  const results = await Order.find({
    status: {
      $in: ['approved', 'printed', 'in progress'],
    },
  });
  const orders = results.map((doc) => {
    const order = doc.toObject();
    order._id = order._id.toString();
    order.createdAt = new Date(order?.createdAt || null).getDate();
    order.updatedAt = new Date(order?.updatedAt || null).getDate();
    return order;
  });

  return { props: { orders: orders } };
}

export default ProductionQueue;
