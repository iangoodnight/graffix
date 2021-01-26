import { useState } from 'react';
import Link from 'next/link';
import tableStyles from './Table.module.scss';

const TableRow = ({ headers, data, odd }) => {
  const [rowInterface, setInterface] = useState({
    open: false,
  });

  const className = {
    mobile: tableStyles['hide-mobile'],
    table: tableStyles['hide-tablet'],
  };
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
    console.log(e.type);
    console.log(rowInterface);
  };

  return (
    <>
      <tr
        data-id={data._id}
        tabIndex="1"
        className={rowModifier}
        onKeyDown={handleInterface}
        onDoubleClick={handleInterface}
      >
        {headers.map((col) => (
          <td
            className={col.hide ? className[col.hide] : ''}
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
          <div tabIndex="1">
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
        </td>
      </tr>
    </>
  );
};

export default TableRow;
