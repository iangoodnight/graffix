import { useRouter } from 'next/router';
import useSWR from 'swr';

import OrderForm from '../../../components/OrderForm';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditOrder = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: order, error } = useSWR(
    id ? `/api/orders/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!order) return <p>Loading...</p>;
  console.log(order);
  const orderForm = {
    order_number: order.order_number,
    customer: order.customer['name'],
    email: order.customer['email'],
    artwork: {
      title: order?.artwork?.title || '',
      link: order?.artwork?.link || '',
    },
    label_quantity: order.label_quantity,
    label_dimensions: {
      height: order.label_dimensions.height,
      width: order.label_dimensions.width,
      unit: order.label_dimensions.unit,
    },
    laminate: order.laminate,
    priority: order.priority,
    status: order.status,
    in_house: order.in_house,
  };

  return (
    <OrderForm
      formId="edit-order-form"
      orderForm={orderForm}
      forNewOrder={false}
    />
  );
};

export default EditOrder;
