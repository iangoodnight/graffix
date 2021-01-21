import tableStyles from './Table.module.scss';

const TableRow = ({ headers, data }) => {
  return (
    <tr data-id={data._id}>
      {headers.map((col) =>
        data[col.field] && col.hide ? (
          <td className={tableStyles.hide}>{data[col.field]}</td>
        ) : (
          <td>{data[col.field]}</td>
        )
      )}
    </tr>
  );
};

export default TableRow;
