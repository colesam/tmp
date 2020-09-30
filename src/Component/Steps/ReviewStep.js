import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectBudgetLineList } from "../../Store/budgetLines";
import Card from "../Card";
import Button from "../El/Button";
import ResultTable from "../Table/ResultTable";
import { selectStartAndEndDate } from "../../Store/settings";

/**
 * In this step, the user reviews the sums calculated from the categorize step.
 *
 */
function ReviewStep({ onBack }) {
  // Store selectors
  const budgetLineList = useSelector(selectBudgetLineList);
  const { endDate } = useSelector(selectStartAndEndDate);

  // Computed variables
  const categorizedSums = budgetLineList.reduce((acc, { amount, category }) => {
    if (category === "Ignore") return acc;

    if (!acc.hasOwnProperty(category)) {
      acc[category] = 0;
    }

    acc[category] += amount;

    return acc;
  }, {});

  // Effects
  useEffect(() => {
    localStorage.setItem("lastSessionEndDate", endDate);
  }, [endDate]);

  return (
    <div className="ReviewStep">
      <Card>
        <div className="flex">
          <div className="w-full mr-4">
            <Button type="normal" onClick={onBack}>
              Back
            </Button>
          </div>
          <div className="w-full">
            <Button type="normal">Download Results</Button>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <Card heading="Uploaded Files">
          <ResultTable categorizedSums={categorizedSums} />
        </Card>
      </div>
    </div>
  );
}

ReviewStep.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default ReviewStep;
