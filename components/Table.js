import tableStyles from './Table.module.scss';

const Table = ({ headers, children }) => {
  return (
    <table className={tableStyles.table}>
      <thead>
        <tr>
          {headers.map((col) =>
            col.hide ? (
              <td className={tableStyles.hide}>{col.name}</td>
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
