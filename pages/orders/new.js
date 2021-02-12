import OrderForm from '../../components/OrderForm';

const NewOrder = () => {
  const orderForm = {
    order_number: '',
    customer: '',
    email: '',
    artwork: {
      title: '',
      link: '',
    },
    label_quantity: '',
    label_dimensions: {
      height: '',
      width: '',
      unit: 'inches',
    },
    laminate: 'matte',
    machine: '',
    priority: '',
    status: 'new',
    in_house: false,
  };

  return <OrderForm formId="add-order-form" orderForm={orderForm} />;
};

export default NewOrder;
