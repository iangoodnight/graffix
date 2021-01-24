import { useRouter } from 'next/router';
import { useState } from 'react';
import { mutate } from 'swr';

import orderFormStyles from './OrderForm.module.scss';

const OrderForm = ({ formId, orderForm, forNewOrder = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    order_number: orderForm.order_number,
    customer: orderForm.customer,
    product: orderForm.product,
    label_quantity: orderForm.label_quantity,
    label_dimensions: {
      height: orderForm.height,
      width: orderForm.width,
      unit: orderForm.unit,
    },
    laminate: orderForm.laminate,
    priority: orderForm.priority,
    status: orderForm.status,
    in_house: orderForm.in_house,
  });

  /* PUT method for editing an existing entry */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      /* Throw error with status code in case Fetch fails */
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      /* Update local data without revalidation */
      mutate(`/api/orders/${id}`, data, false);
      router.push('/');
    } catch (error) {
      setMessage('Failed to update order');
    }
  };

  /* POST method for adding new entries */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      /* Throw error with status code in case Fetch fails */
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/');
    } catch (error) {
      setMessage('Failed to add order');
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
      forNewOrder ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const formValidate = () => {
    let err = {};
    if (!form.order_number) err.order_number = 'Order number is required';
    if (!form.customer) err.customer = 'Customer name is required';
    return err;
  };

  return (
    <>
      <form
        id={formId}
        className={orderFormStyles.form}
        onSubmit={handleSubmit}
      >
        <h1>Order</h1>
        <p className={orderFormStyles.description}>
          <span>
            {forNewOrder
              ? `New order: ${form.order_number}`
              : `Currently editing order: ${form.order_number}`}
          </span>
        </p>

        <label htmlFor="order_number">Order number</label>
        <input
          type="text"
          maxLength="16"
          name="order_number"
          value={form.order_number}
          onChange={handleChange}
          required
        />

        <label htmlFor="customer">Customer</label>
        <input
          type="text"
          maxLength="64"
          name="customer"
          value={form.customer}
          onChange={handleChange}
          required
        />

        <label htmlFor="product">Product</label>
        <input
          type="text"
          name="product"
          value={form.product}
          onChange={handleChange}
        />

        <label htmlFor="label_quantity">Quantity</label>
        <input
          type="number"
          name="label_quantity"
          value={form.label_quantity}
          onChange={handleChange}
        />

        <label htmlFor="height">Height</label>
        <input
          type="text"
          name="height"
          value={form.label_dimensions.height}
          onChange={handleChange}
        />
        
        <label htmlFor="width">Width</label>
        <input
          type="text"
          name="height"
          value={form.label_dimensions.width}
          onChange={handleChange}
        />

        <label htmlFor="unit">Unit</label>
        <input
          type="text"
          maxLength="16"
          value={form.label_dimensions.unit}
          onChange={handleChange}
        />

        <label htmlFor="laminate">Laminate</label>
        <select name="laminate" value={form.laminate} onChange={handleChange}>
          <option value="">---</option>
          <option value="matte">Matte</option>
          <option value="high-gloss">High-gloss</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="">---</option>
          <option value="rush">Rush</option>
          <option value="reprint">Reprint</option>
        </select>

        <label htmlFor="status">Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="new">New</option>
          <option value="initial contact">Reach-out</option>
          <option value="rendering">Rendering</option>
          <option value="pending approval">Pending Approval</option>
          <option value="approved">Approved</option>
          <option value="printed">Printed</option>
          <option value="in progress">In progress</option>
          <option value="on hold">On hold</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label htmlFor="in_house">In house</label>
        <input
          type="checkbox"
          name="in_house"
          checked={form.in_house}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
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

export default OrderForm;
