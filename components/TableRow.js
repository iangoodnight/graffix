import tableStyles from './Table.module.scss';

const TableRow = ({ headers, data }) => {
  const className = {
    mobile: tableStyles['hide-mobile'],
    table: tableStyles['hide-tablet'],
  }

  return (
    <tr
      data-id={data._id}
      tabIndex="1"
    >
      {headers.map((col) =>
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
        ) : data[col.field]}
          </td>
      )}
    </tr>
  );
};

export default TableRow;
