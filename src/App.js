import React, { useState } from "react";
import ImportStep from "./Component/Steps/ImportStep";
import CategorizeStep from "./Component/Steps/CategorizeStep";
import ReviewStep from "./Component/Steps/ReviewStep";
import "./App.css";

function App() {
  const [stepIndex, setStepIndex] = useState(0);

  const next = () => setStepIndex((stepIndex) => stepIndex + 1);

  const back = () => setStepIndex((stepIndex) => stepIndex - 1);

  const steps = [
    <ImportStep onNext={next} />,
    <CategorizeStep onBack={back} onNext={next} />,
    <ReviewStep onBack={back} />,
  ];

  return (
    <div className="App">
      <div className="App_container w-2/3">{steps[stepIndex]}</div>
    </div>
  );
}

export default App;
