import React from "react";
import PropTypes from "prop-types";
import Table from "../El/Table";
import Select from "../El/Select";
import Spinner from "../SVG/Spinner";
import Check from "../SVG/Check";

function FileTable({ files, importProfiles, onImportProfileSelect }) {
  const headers = [
    { key: "icon", content: "", width: "5%" },
    { key: "fileName", content: "File Name", width: "70%" },
    { key: "importProfileSelector", content: "Import Profile", width: null },
  ];

  const importProfileOptions = importProfiles.map((name) => (
    <option value={name} key={name}>
      {name}
    </option>
  ));

  const data = files.map(({ id, fileName, isLoaded, importProfileName }) => {
    return {
      key: id,
      icon: isLoaded ? <Check size="sm" /> : <Spinner size="sm" />,
      fileName,
      importProfileSelector: (
        <Select
          value={importProfileName}
          label={`Import Profile Selection for ${fileName}`}
          id={`importProfileSelect_${id}`}
          key={id}
          onChange={(e) => onImportProfileSelect(id, e.target.value)}
        >
          {importProfileOptions}
        </Select>
      ),
    };
  });

  return <Table headers={headers} data={data} />;
}

FileTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  importProfiles: PropTypes.arrayOf(PropTypes.string),
  onImportProfileSelect: PropTypes.func,
};

FileTable.defaultProps = {
  files: [],
  importProfiles: [],
  onImportProfileSelect: (e) => console.log(e),
};

export default FileTable;
