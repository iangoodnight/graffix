import OrderForm from '../../components/OrderForm';

const NewOrder = () => {
  const orderForm = {
    order_number: '',
    customer: '',
    product: '',
    label_quantity: '',
    laminate: '',
    priority: '',
    status: 'new',
    in_house: false,
  };

  return <OrderForm formId="add-order-form" orderForm={orderForm} />;
};

export default NewOrder;
