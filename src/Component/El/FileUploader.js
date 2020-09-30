import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { readFileAsText } from "../../Lib/FileReader";
import { generateShortId } from "../../Lib/Utils";

function FileUploader({ id, multiple, onLoadBegin, onLoadEnd }) {
  const fileInput = useRef(null);

  const handleClick = () => {
    if (fileInput.current !== null) {
      // noinspection JSUnresolvedFunction
      fileInput.current.click();
    }
  };

  const handleUpload = () => {
    if (onLoadBegin == null && onLoadEnd == null) {
      return;
    }

    // Read the files by default, add optional prop if this needs to change later
    const { files } = fileInput.current;

    // Manually loop because map not supported for FileTable
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const id = generateShortId();

      onLoadBegin({ id, fileName: file.name });

      readFileAsText(file)
        .then((contents) => {
          onLoadEnd({
            id,
            contents,
          });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="FileUploader">
      <Button onClick={handleClick}>Upload Files (.csv)</Button>
      <input
        type="file"
        multiple={multiple}
        ref={fileInput}
        id={id}
        onChange={handleUpload}
        hidden
      />
    </div>
  );
}

FileUploader.propTypes = {
  id: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  onLoadBegin: PropTypes.func,
  onLoadEnd: PropTypes.func,
};

FileUploader.defaultProps = {
  multiple: false,
  onLoadBegin: null,
  onLoadEnd: null,
};

export default FileUploader;
