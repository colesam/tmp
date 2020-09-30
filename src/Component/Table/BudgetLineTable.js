import React from "react";
import PropTypes from "prop-types";
import Table from "../El/Table";
import Select from "../El/Select";
import Currency from "../Currency";

function BudgetLineTable({ budgetLines, files, categories, onCategorySelect }) {
  const headers = [
    { key: "importProfileName", content: "Import Profile", width: "10%" },
    { key: "date", content: "Date", width: "10%" },
    { key: "desc", content: "Description", width: "40%" },
    { key: "amount", content: "Amount", width: "17%" },
    { key: "category", content: "Category", width: null },
  ];

  const categoryOptions = categories.map((name) => (
    <option value={name} key={name}>
      {name}
    </option>
  ));

  const getImportProfileName = (fileId) =>
    files.hasOwnProperty(fileId) ? files[fileId].importProfileName : "None";

  const data = budgetLines
    .sort((a, b) => {
      const primarySort = getImportProfileName(a).localeCompare(
        getImportProfileName(b)
      );

      if (primarySort !== 0) {
        return primarySort;
      }

      return a.date.localeCompare(b.date);
    })
    .map(({ id, fileId, date, desc, amount, category }) => {
      const importProfileName = getImportProfileName(fileId);
      const isIgnored = category === "Ignore";

      return {
        key: id,
        importProfileName: (
          <span className={isIgnored ? "ignored" : ""}>
            {importProfileName}
          </span>
        ),
        date: <span className={isIgnored ? "ignored" : ""}>{date}</span>,
        desc: <span className={isIgnored ? "ignored" : ""}>{desc}</span>,
        amount: (
          <Currency amount={amount} type={isIgnored ? "ignored" : "colored"} />
        ),
        category: (
          <Select
            value={category}
            label={`Category Selection for ${desc}`}
            id={`categorySelect_${id}`}
            key={id}
            onChange={(e) => onCategorySelect(id, e.target.value)}
          >
            {categoryOptions}
          </Select>
        ),
      };
    });

  return <Table headers={headers} data={data} />;
}

BudgetLineTable.propTypes = {
  budgetLines: PropTypes.arrayOf(PropTypes.object),
  files: PropTypes.object, // Need files keyed by id
  categories: PropTypes.arrayOf(PropTypes.string),
};

BudgetLineTable.defaultProps = {
  budgetLines: [],
  files: {},
  categories: [],
  onCategorySelect: (e) => console.log(e),
};

export default BudgetLineTable;
