import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectBudgetLineList, setLineAction } from "../../Store/budgetLines";
import Card from "../Card";
import Button from "../El/Button";
import Spinner from "../SVG/Spinner";
import BudgetLineTable from "../Table/BudgetLineTable";
import { budgetCategories } from "../../config";
import { makeCSV } from "../../Lib/CSV";

/**
 * In this step, the user categorizes the imported data into "budget lines".
 *
 */
function CategorizeStep({ onBack, onNext }) {
  const downloadAnchor = useRef(null);

  // Store selectors
  const budgetLineList = useSelector(selectBudgetLineList);
  const files = useSelector((state) => state.files);

  // Store setters
  const dispatch = useDispatch();
  const setLine = (line) => dispatch(setLineAction(line));

  // Computed variables
  const disableNext =
    budgetLineList.findIndex(({ category }) => category === null) >= 0;

  // Handlers
  const handleCategorySelect = (id, category) => {
    setLine({ id, category });
  };

  const handleDownload = () => {
    const csvRows = [...budgetLineList]
      .sort((a, b) => a.category.localeCompare(b.category))
      .map((line) => [
        files[line.fileId].importProfileName,
        line.date,
        line.desc,
        line.amount,
        line.category,
      ]);

    const csvText = makeCSV(
      ["Import Profile", "Date", "Description", "Amount", "Category"],
      csvRows
    );

    // TODO: Fix this workaround properly
    downloadAnchor.current.setAttribute("href", csvText);
    downloadAnchor.current.click();
  };

  const handleNext = () => {
    if (disableNext) {
      return;
    }
    onNext();
  };

  return (
    <div className="CategorizeStep">
      <Card>
        <a
          className="hidden"
          href="none"
          ref={downloadAnchor}
          download="budget_lines.csv"
        >
          Hidden Tag
        </a>

        <div className="flex">
          <div className="w-full mr-4">
            <Button type="normal" onClick={onBack}>
              Back
            </Button>
          </div>
          <div className="w-full">
            <Button type="success" disabled={disableNext} onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <Card heading="Budget Lines">
          {budgetLineList.length ? (
            <div>
              <div className="mb-6">
                <BudgetLineTable
                  budgetLines={budgetLineList}
                  files={files}
                  categories={budgetCategories}
                  onCategorySelect={handleCategorySelect}
                />
              </div>
              <div className="flex justify-end">
                <div className="w-1/4 mr-4">
                  <Button
                    type="normal"
                    disabled={disableNext}
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </div>
                <div className="w-1/4">
                  <Button
                    type="success"
                    disabled={disableNext}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

CategorizeStep.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default CategorizeStep;
