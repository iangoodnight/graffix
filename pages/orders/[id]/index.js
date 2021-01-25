// import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Order from '../../../models/Order';
import dbConnect from '../../../utils/dbConnect';

/* Allows you to view order info and delete order */
const OrderPage = ({ order }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    const orderId = router.query.id;

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the order.');
    }
  };

  return (
    <div key={order._id}>
      <h5>{order.order_number}</h5>
      <h5>{order.customer}</h5>
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const order = await Order.findById(params.id).lean();
  order._id = order._id.toString();
  order.createdAt = new Date(order?.createdAt || null).getDate();
  order.updatedAt = new Date(order?.updatedAt || null).getDate();

  return { props: { order } };
}

export default OrderPage;
