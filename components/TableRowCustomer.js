import Link from 'next/link';
import { useState } from 'react';

import tableStyles from './Table.module.scss';

const TableRowCustomer = ({ headers, data, odd }) => {
  const [rowInterface, setInterface] = useState({
    open: false,
  });

  const rowModifier = odd ? tableStyles.odd : '';

  const handleInterface = (e) => {
    if (e.which === 13 || e.type === 'dblclick') {
      setInterface({ ...rowInterface, open: !rowInterface.open });
    }
  };

  return (
    <>
      <tr
        data-id={data._id}
        tabIndex="0"
        className={`${rowModifier} ${
          rowInterface.open ? tableStyles.open : ''
        }`}
        onKeyDown={handleInterface}
        onDoubleClick={(e) => handleInterface(e)}
      >
        {headers.map((col) => (
          <td
            className={col.field === 'email' ? tableStyles.email : ''}
            key={`${col.field}-${data._id}`}
          >
            {data[col.field]}
          </td>
        ))}
      </tr>
      <tr
        className={`${rowModifier} ${
          rowInterface.open ? '' : tableStyles.hidden
        }`}
      >
        <td colSpan={headers.length}>
          <ul>
            <li>
              <p>
                <span>Phone: </span>
                {data.phone}
              </p>
            </li>
            <li>
              <p>
                <span>Notes: </span>
                {data.notes}
              </p>
            </li>
            <li>
              <table className={tableStyles.nested}>
                <thead>
                  <tr>
                    <td colSpan="2">Open jobs:</td>
                  </tr>
                </thead>
                <tbody>
                  {data.orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <Link href={`/orders/${order._id}`}>
                          {order.order_number}
                        </Link>
                      </td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          </ul>
          <div className={tableStyles['button-row']}>
            <button
              aria-label="Hide details"
              onClick={() => {
                setInterface({
                  ...rowInterface,
                  open: !rowInterface.open,
                });
              }}
            >
              Hide
            </button>
            <Link href={`/customers/${data._id}`}>
              <button aria-label="View details">View</button>
            </Link>
            <Link href={`/orders/${data._id}/edit`}>
              <button aria-label="Edit customer">Edit</button>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRowCustomer;
