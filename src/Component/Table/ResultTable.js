import React from "react";
import PropTypes from "prop-types";
import Table from "../El/Table";
import Currency from "../Currency";

function ResultTable({ categorizedSums }) {
  const headers = [
    { key: "category", content: "Category", width: "75%" },
    { key: "amount", content: "Amount Change", width: null },
  ];

  const data = Object.entries(categorizedSums).map(([category, amount]) => ({
    category,
    amount: <Currency amount={amount} type="colored" />,
  }));

  return <Table headers={headers} data={data} />;
}

ResultTable.propTypes = {
  categorizedSums: PropTypes.objectOf(PropTypes.number),
};

ResultTable.defaultProps = {
  categorizedSums: {},
};

export default ResultTable;
