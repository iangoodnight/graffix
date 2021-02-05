import '../../models/Customer';

import { useState } from 'react';

import RadioButtons from '../../components/RadioButtons';
import Table from '../../components/Table';
import TableRowCustomer from '../../components/TableRowCustomer';
import Order from '../../models/Order';
import dbConnect from '../../utils/dbConnect';

const ActiveCustomers = ({ customers }) => {
  const [activeFilter, setActiveFilter] = useState({
    'in-house': true,
    external: true,
  });

  const [radio, setRadio] = useState({
    checked: 0,
  });

  const headers = [
    { name: 'customer', field: 'name' },
    { name: 'email', field: 'email' },
  ];

  const handleChange = (e) => {
    const index = parseInt(e.target.id.split('-')[1]);
    setRadio({ ...radio, checked: index });
    switch (index) {
      case 0:
        setActiveFilter({
          ...activeFilter,
          ['in-house']: true,
          ['external']: true,
        });
        break;
      case 1:
        setActiveFilter({
          ...activeFilter,
          ['in-house']: true,
          ['external']: true,
        });
        break;
      case 2:
        setActiveFilter({
          ...activeFilter,
          ['in-house']: false,
          ['external']: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Active Customers</h1>
      <RadioButtons
        options={['all customers', ...Object.keys(activeFilter)]}
        radio={radio}
        handleChange={handleChange}
      />
      <Table headers={headers}>
        {customers.map((customer, i) =>
          activeFilter['external'] === activeFilter['in-house'] ? (
            <TableRowCustomer
              headers={headers}
              data={customer}
              key={customer._id}
              odd={i % 2 !== 0}
            />
          ) : activeFilter['in-house'] && customer.in_house ? (
            <TableRowCustomer
              headers={headers}
              data={customer}
              key={customer._id}
              odd={i % 2 !== 0}
            />
          ) : activeFilter['external'] && !customer.in_house ? (
            <TableRowCustomer
              headers={headers}
              data={customer}
              key={customer._id}
              odd={i % 2 !== 0}
            />
          ) : null
        )}
      </Table>
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const result = await Order.find({
    status: {
      $nin: ['completed', 'cancelled'],
    },
  })
    .populate('customer')
    .sort([['order_date', 'asc']]);

  const activeCustomerIds = new Set();
  const activeCustomers = {};
  result.forEach((doc) => {
    const order = doc.toObject();
    const customerId = order.customer._id.toString();
    const orderId = order._id.toString();
    if (!activeCustomerIds.has(customerId)) {
      activeCustomerIds.add(customerId);
      const customer = order.customer;
      const { name, email, phone, notes } = customer;
      activeCustomers[customerId] = {
        _id: customerId,
        name,
        email,
        phone,
        notes,
        orders: [],
      };
    }

    const { order_number, status } = order;
    activeCustomers[customerId].orders.push({
      _id: orderId,
      order_number,
      status,
    });
  });
  const customers = Object.values(activeCustomers);

  return { props: { customers: customers } };
}

export default ActiveCustomers;
