import React from "react";
import PropTypes from "prop-types";
import "./Table.css";

function Table({ headers, data, keyDataBy }) {
  const tableHeaders = headers.map(({ content, width, key }) => (
    <th className="Table_th" width={width} key={key}>
      {content}
    </th>
  ));

  const tableData = data.map((record) => {
    const contents = headers.map(({ key }) => (
      <td className="Table_td" key={key}>
        {record[key]}
      </td>
    ));
    return (
      <tr className="Table_row" key={record[keyDataBy]}>
        {contents}
      </tr>
    );
  });

  return (
    <table className="Table">
      <thead className="Table_header">
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Table.defaultProps = {
  keyDataBy: "key",
};

export default Table;
