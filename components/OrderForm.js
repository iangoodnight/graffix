import { useRouter } from 'next/router';
import { useState } from 'react';
import { mutate } from 'swr';

import orderFormStyles from './OrderForm.module.scss';
import OrderSuccessModal from './OrderSuccessModal';

const OrderForm = ({ formId, orderForm, forNewOrder = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    order_number: orderForm.order_number,
    customer: orderForm.customer,
    email: orderForm.email,
    artwork: {
      title: orderForm.artwork.title,
      link: orderForm.artwork.link,
    },
    label_quantity: orderForm.label_quantity,
    label_dimensions: {
      height: orderForm.label_dimensions.height,
      width: orderForm.label_dimensions.width,
      unit: orderForm.label_dimensions.unit,
    },
    laminate: orderForm.laminate,
    machine: orderForm.machine,
    priority: orderForm.priority,
    status: orderForm.status,
    in_house: orderForm.in_house,
    notes: orderForm.notes,
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
      router.push('/orders');
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

    switch (name) {
      case 'artwork':
        setForm({
          ...form,
          artwork: { ...form.artwork, title: value },
        });
        break;
      case 'link':
        setForm({
          ...form,
          artwork: { ...form.artwork, link: value },
        });
        break;
      case 'height':
        setForm({
          ...form,
          label_dimensions: { ...form.label_dimensions, height: value },
        });
        break;
      case 'width':
        setForm({
          ...form,
          label_dimensions: { ...form.label_dimensions, width: value },
        });
        break;
      case 'unit':
        setForm({
          ...form,
          label_dimensions: { ...form.label_dimensions, unit: value },
        });
        break;
      case 'in_house':
        setForm({
          ...form,
          in_house: !form.in_house,
          order_number: !form.in_house
            ? `BANE-${Math.floor(Date.now() / 1000)}`
            : forNewOrder
            ? ''
            : form.order_number,
        });
        break;
      default:
        setForm({
          ...form,
          [name]: value,
        });
        break;
    }
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

  const handleClick = (e) => {
    e.preventDefault();
    const targetName = e.target.name;

    switch (targetName) {
      case 'orders':
        router.push('/orders');
        break;
      case 'add':
        setForm({
          ...form,
          artwork: { title: '', link: '' },
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
          notes: '',
        });
        break;
      default:
        break;
    }
    console.log(e.target.name);
  };

  const formValidate = () => {
    let err = {};
    if (!form.order_number) err.order_number = 'Order number is required';
    return err;
  };

  return (
    <>
      <OrderSuccessModal visible={true} handleClick={handleClick} />
      <form
        id={formId}
        className={orderFormStyles.form}
        onSubmit={handleSubmit}
      >
        <div className={orderFormStyles.head}>
          <h1>Order</h1>
          <p className={orderFormStyles.description}>
            <span>
              {forNewOrder
                ? `New order: ${form.order_number}`
                : `Currently editing order: ${form.order_number}`}
            </span>
          </p>
        </div>

        <div className={orderFormStyles['in-house']}>
          <label htmlFor="in_house">In house</label>
          <input
            type="checkbox"
            name="in_house"
            checked={form.in_house}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles['order-number']}>
          <label htmlFor="order_number">Order number</label>
          <input
            type="text"
            maxLength="16"
            name="order_number"
            value={form.order_number}
            onChange={handleChange}
            disabled={form.in_house}
            required
          />
        </div>

        <div className={orderFormStyles.priority}>
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            defaultValue={form.priority}
            onBlur={handleChange}
          >
            <option value="">---</option>
            <option value="rush">Rush</option>
            <option value="reprint">Reprint</option>
          </select>
        </div>

        <div className={orderFormStyles.customer}>
          <label htmlFor="customer">Customer</label>
          <input
            type="text"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            disabled={forNewOrder ? false : true}
            required
          />
        </div>

        <div className={orderFormStyles.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles.artwork}>
          <label htmlFor="artwork">Artwork</label>
          <input
            type="text"
            name="artwork"
            value={form.artwork.title}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles.link}>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            name="link"
            value={form.artwork.link}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles.quantity}>
          <label htmlFor="label_quantity">Quantity</label>
          <input
            type="number"
            name="label_quantity"
            value={form.label_quantity}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles.laminate}>
          <label htmlFor="laminate">Laminate</label>
          <select
            name="laminate"
            defaultValue={form.laminate}
            onBlur={handleChange}
          >
            <option value="">---</option>
            <option value="matte">Matte</option>
            <option value="high-gloss">High-gloss</option>
          </select>
        </div>

        <div className={orderFormStyles.height}>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            step={0.01}
            name="height"
            value={form.label_dimensions.height}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles.width}>
          <label htmlFor="width">Width</label>
          <input
            type="number"
            step={0.01}
            name="width"
            value={form.label_dimensions.width}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles.unit}>
          <label htmlFor="unit">Unit</label>
          <select
            name="unit"
            defaultValue={form.label_dimensions.unit}
            onBlur={handleChange}
          >
            <option value="inches">inches</option>
            <option value="centimeters">centimeters</option>
            <option value="millimeters">millimeters</option>
          </select>
        </div>

        <div className={orderFormStyles.machine}>
          <label htmlFor="machine">Machine</label>
          <select
            name="machine"
            defaultValue={form.machine}
            onBlur={handleChange}
          >
            <option value="">---</option>
            <option value="metas">Metas</option>
            <option value="plotter">Plotter</option>
          </select>
        </div>

        <div className={orderFormStyles.status}>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            defaultValue={form.status}
            onBlur={handleChange}
          >
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
        </div>

        <div className={orderFormStyles.notes}>
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            rows="6"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className={orderFormStyles.submit}>
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

export default OrderForm;
