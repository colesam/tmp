import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  setFileAction,
  clearFilesAction,
  selectFileList,
  selectFilesExist,
} from "../../Store/files";
import { setLinesAction, clearLinesAction } from "../../Store/budgetLines";
import Card from "../Card";
import Button from "../El/Button";
import FileUploader from "../El/FileUploader";
import FileTable from "../Table/FileTable";
import DateInput from "../El/DateInput";
import Label from "../El/Label";
import { autoMatchProfile } from "../../Lib/DataImport";
import { importProfiles } from "../../config";
import { generateShortId } from "../../Lib/Utils";
import { processFiles } from "../../WebWorker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { selectStartAndEndDate, setSettingsAction } from "../../Store/settings";

dayjs.extend(isBetween);

/**
 * In this step, the user imports data by uploading one or more csv files.
 * TODO: Figure out a way to break up all the complex logic in this component
 *
 */
function ImportStep({ onNext }) {
  // Store selectors
  const fileList = useSelector(selectFileList);
  const filesExist = useSelector(selectFilesExist);
  const { startDate, endDate } = useSelector(selectStartAndEndDate);

  // Store setters
  const dispatch = useDispatch();
  const setFile = (file) => dispatch(setFileAction(file));
  const clearFiles = () => dispatch(clearFilesAction());
  const setLines = (line) => dispatch(setLinesAction(line));
  const clearLines = () => dispatch(clearLinesAction());
  const setSettings = (settings) => dispatch(setSettingsAction(settings));

  // Computed variables
  const disableNext =
    !filesExist ||
    fileList.find(
      ({ isLoaded, importProfile }) => !isLoaded || importProfile === null
    ) !== undefined;

  const importProfileNames = importProfiles.map(({ name }) => name);

  // Handlers
  const handleLoadBegin = ({ id, fileName }) => {
    clearLines();
    setFile({
      id,
      fileName,
      importProfileName: autoMatchProfile(fileName, importProfiles),
    });
  };

  const handleLoadEnd = ({ id, contents }) => {
    // Simulating slightly longer load gives smoother feel
    setTimeout(() => {
      setFile({
        id,
        textContent: contents,
        isLoaded: true,
      });
    }, 500);
  };

  const handleImportProfileSelect = (id, importProfileName) => {
    setFile({ id, importProfileName });
  };

  const handleNext = () => {
    if (disableNext) {
      return;
    }

    onNext();

    // Convert file contents to budget lines using web worker
    processFiles(fileList).then((budgetLines) => {
      // Add ids and key by id
      budgetLines = budgetLines.reduce((acc, line) => {
        // Filter out if not in date range
        const lineDate = dayjs(line.date, "MM/DD/YYYY");
        if (lineDate.isBetween(startDate, endDate, null, "[]")) {
          line.id = generateShortId();
          acc[line.id] = line;
        }
        return acc;
      }, {});

      setLines(budgetLines);
    });
  };

  return (
    <div className="ImportStep">
      <Card>
        <div className="flex">
          <div className="w-full mr-4">
            <FileUploader
              multiple={true}
              id="file-upload"
              onLoadBegin={handleLoadBegin}
              onLoadEnd={handleLoadEnd}
            />
          </div>
          <div className="w-full mr-4">
            <Button type="normal" disabled={!filesExist} onClick={clearFiles}>
              Clear Uploads
            </Button>
          </div>
          <div className="w-full">
            <Button type="success" disabled={disableNext} onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* TODO: Fix styling on this section, very cluttered */}
      {filesExist && (
        <div className="mt-8">
          <Card heading="Uploaded Files">
            <div className="mb-6">
              <div className="mb-4">
                <FileTable
                  files={fileList}
                  importProfiles={importProfileNames}
                  onImportProfileSelect={handleImportProfileSelect}
                />
              </div>
              <div className="flex justify-end">
                <div className="mr-4">
                  <Label htmlFor="start-date">Ignore Before:</Label>
                  <DateInput
                    value={startDate}
                    dateFormat="MM/DD/YYYY"
                    id="start-date"
                    onChange={(startDate) => setSettings({ startDate })}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">Ignore After:</Label>
                  <DateInput
                    value={endDate}
                    dateFormat="MM/DD/YYYY"
                    id="end-date"
                    onChange={(endDate) => setSettings({ endDate })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-full">
                <Button
                  type="success"
                  disabled={disableNext}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

ImportStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default ImportStep;
