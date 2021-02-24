import OrderForm from '../../components/OrderForm';

const NewOrder = () => {
  const formattedDate = () => {
    const date = new Date();
    const year = '' + date.getFullYear();
    const month = `${date.getMonth() + 1}`;
    const day = '' + date.getDate();
    const fmonth = month.length < 2 ? '0' + month : month;
    const fday = day.length < 2 ? '0' + day : day;
    return `${year}-${fmonth}-${fday}`;
  };

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
    upc: '',
    order_date: formattedDate(),
  };

  return <OrderForm formId="add-order-form" orderForm={orderForm} />;
};

export default NewOrder;
