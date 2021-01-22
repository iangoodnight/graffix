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

  const orderForm = {
    order_number: order.order_number,
    customer: order.customer,
    product: order.product,
    label_quantity: order.label_quantity,
    laminate: order.laminate,
    priority: order.priority,
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
