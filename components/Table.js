import tableStyles from './Table.module.scss';

const Table = ({ headers, children }) => {
  return (
    <table className={tableStyles.table}>
      <thead>
        <tr>
          {headers.map((col) =>
            col.hide === 'mobile' ? (
              <td className={tableStyles['hide-mobile']}>{col.name}</td>
            ) : col.hide === 'tablet' ? (
              <td className={tableStyles['hide-tablet']}>{col.name}</td>
            ) : (
              <td>{col.name}</td>
            )
          )}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
