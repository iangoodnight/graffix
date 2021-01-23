import tableStyles from './Table.module.scss';

const TableRow = ({ headers, data }) => {
  return (
    <tr data-id={data._id}>
      {headers.map((col) =>
        col.hide === 'mobile' ? (
          <td className={tableStyles['hide-mobile']}>{data[col.field]}</td>
        ) : col.hide === 'tablet' ? (
          <td className={tableStyles['hide-tablet']}>{data[col.field]}</td>
        ) : (
          <td>{data[col.field]}</td>
        )
      )}
    </tr>
  );
};

export default TableRow;
