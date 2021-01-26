import tableStyles from './Table.module.scss';

const Table = ({ headers, children }) => {
  return (
    <table className={tableStyles.table}>
      <thead>
        <tr>
          {headers.map((col) =>
            col.hide === 'mobile' ? (
              <td className={tableStyles['hide-mobile']} key={col.field}>
                {col.name}
              </td>
            ) : col.hide === 'tablet' ? (
              <td className={tableStyles['hide-tablet']} key={col.field}>
                {col.name}
              </td>
            ) : (
              <td key={col.field}>{col.name}</td>
            )
          )}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
