import { useRouter } from 'next/router';
import { useState } from 'react';
import { mutate } from 'swr';

import customerFormStyles from './CustomerForm.module.scss';

const CustomerForm = ({ formId, customerForm, forNewCustomer = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: customerForm.name,
    email: customerForm.email,
    phone: customerForm.phone,
    in_house: customerForm.in_house,
    notes: customerForm.notes,
  });

  /* PUT method for updates */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      /* Throw error on fail */
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      /* Update local data without revalidation */
      mutate(`/api/customers/${id}`, data, false);
      router.push('/customers');
    } catch (error) {
      setMessage('Failed to update customer');
    }
  };

  /* POST method for adding new entries */
  const postData = async (form) => {
    try {
      console.log(JSON.stringify(form));
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      /* Throw error on fail */
      if (!res.ok) {
        throw new Error(res.status);
      }
      router.push('/customers');
    } catch (error) {
      setMessage('Failed to add customer');
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.name === 'in_house' ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewCustomer ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const formValidate = () => {
    let err = {};
    if (!form.email) err.email = 'Email is required';
    return err;
  };

  return (
    <>
      <form
        id={formId}
        className={customerFormStyles.form}
        onSubmit={handleSubmit}
      >
        <div className={customerFormStyles.head}>
          <h1>Customer</h1>
          <p className={customerFormStyles.description}>
            <span>
              {forNewCustomer
                ? `New customer: ${form.name}`
                : `Currently editing customer: ${form.name}`}
            </span>
          </p>
        </div>

        <div className={customerFormStyles.name}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={customerFormStyles.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={customerFormStyles.phone}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className={customerFormStyles.notes}>
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            rows="6"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className={customerFormStyles['in-house']}>
          <label htmlFor="in_house">In house</label>
          <input
            type="checkbox"
            name="in_house"
            checked={form.in_house}
            onChange={handleChange}
          />
        </div>

        <div className={customerFormStyles.submit}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default CustomerForm;
