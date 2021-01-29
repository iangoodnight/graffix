import Link from 'next/link';
import { useState } from 'react';

import tableStyles from './Table.module.scss';

const TableRow = ({ headers, data, odd }) => {
  const [rowInterface, setInterface] = useState({
    open: false,
  });

  const rowModifier =
    data?.priority === 'rush'
      ? tableStyles.rush
      : data?.priority === 'reprint'
      ? tableStyles.reprint
      : odd
      ? tableStyles.odd
      : '';

  const handleInterface = (e) => {
    if (e.which === 13 || e.type === 'dblclick') {
      setInterface({ ...rowInterface, open: !rowInterface.open });
    }
  };

  const formatDimensions = ({ height, width, unit }) => {
    const suffix =
      unit === 'inches'
        ? '"'
        : unit === 'centimeters'
        ? 'cm'
        : unit === 'millimeters'
        ? 'mm'
        : '';
    return <>{`${height}${suffix} x ${width}${suffix}`}</>;
  };

  return (
    <>
      <tr
        data-id={data._id}
        tabIndex="0"
        className={rowModifier}
        onKeyDown={handleInterface}
        onDoubleClick={handleInterface}
      >
        {headers.map((col) => (
          <td
            className={col.hide ? tableStyles[`hide-${col.hide}`] : ''}
            key={`${col.field}-${data._id}`}
          >
            {col.field === 'artwork' ? (
              <a
                href={data?.artwork?.link || ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data?.artwork?.title || ''}
              </a>
            ) : col.field === 'label_dimensions' ? (
              formatDimensions(data.label_dimensions)
            ) : (
              data[col.field]
            )}
          </td>
        ))}
      </tr>
      <tr
        className={`${rowModifier} ${
          rowInterface.open ? '' : tableStyles.hidden
        }`}
      >
        <td colSpan={headers.length}>
          <div>
            <div className={tableStyles['nested-table']}>
              <h3>
                {data.customer} (#{data.order_number})
              </h3>
              <table>
                <tr>
                  <th scope="row">Order date</th>
                  <td>{data.order_date || data.createdAt}</td>
                </tr>
                <tr>
                  <th scope="row">Artwork</th>
                  <td>
                    <a
                      href={data.artwork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.artwork.title}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Quantity</th>
                  <td>{data.label_quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Dimensions</th>
                  <td>{formatDimensions(data.label_dimensions)}</td>
                </tr>
                <tr>
                  <th scope="row">Laminate</th>
                  <td>{data.laminate}</td>
                </tr>
                <tr>
                  <th scope="row">Machine</th>
                  <td>{data.machine || '---'}</td>
                </tr>
                <tr>
                  <th scope="row">Priority</th>
                  <td>{data.priority === '' ? 'none' : data.priority}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>{data.status}</td>
                </tr>
                <tr>
                  <th scope="row">Notes</th>
                  <td>{data.notes}</td>
                </tr>
              </table>
            </div>
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
              <Link href={`/orders/${data._id}`}>
                <button aria-label="View details">View</button>
              </Link>
              <Link href={`/orders/${data._id}/edit`}>
                <button aria-label="Edit order">Edit</button>
              </Link>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
