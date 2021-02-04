import { useRouter } from 'next/router';
import useSWR from 'swr';

import CustomerForm from '../../../components/CustomerForm';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditCustomer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: customer, error } = useSWR(
    id ? `/api/customers/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!customer) return <p>Loading..</p>;

  const customerForm = {
    name: customer.name,
    in_house: customer.in_house,
    email: customer.email,
    phone: customer.phone,
    notes: customer.notes,
  };

  return (
    <CustomerForm
      formId="edit-customer-form"
      customerForm={customerForm}
      forNewCustomer={false}
    />
  );
};

export default EditCustomer;
