import CustomerForm from '../../components/CustomerForm';

const NewCustomer = () => {
  const customerForm = {
    name: '',
    email: '',
    phone: '',
    notes: '',
    in_house: false,
  };

  return (
    <CustomerForm formId="add-customer-form" customerForm={customerForm} />
  );
};

export default NewCustomer;
