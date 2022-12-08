import "./App.css";
import "./bootstrap/css/bootstrap.css";
import { useCoinMetrics } from "./hooks/useCoinMetrics";
import AssetColumn from "./components/AssetColumn";
import MetricColumn from "./components/MetricColumn";

function App() {
  const {
    validAssets,
    activeMetrics,
    alertMessage,
    setAlertMessage,
    resetAssets,
    resetMetrics,
    getAssets,
    getMetrics,
    setValidAssets,
    setActiveMetrics,
  } = useCoinMetrics(); //custom hook that Handles calls to the coin metrics api

  //Function called when the 'reset lists' button is clicked
  const handleResetLists = () => {
    getAssets();
    getMetrics();
    resetAssets();
    resetMetrics();
  };

  return (
    <div className="container">
      <h1 className="page-title">Coin Metrics Take-Home Assesment</h1>
      <p>
        Select an assset to see its corresponding metrics. Select a metric to
        see its corresponding assets. You may deselect an item to reset the
        other list. You may also search for either in thier respective search
        bars. You may use the reset button at the bottom to restore all items to
        each list.
      </p>
      <div className="row">
        <AssetColumn
          activeMetrics={activeMetrics}
          setActiveMetrics={setActiveMetrics}
          validAssets={validAssets}
          setValidAssets={setValidAssets}
          setAlertMessage={setAlertMessage}
          getAssets={getAssets}
          getMetrics={getMetrics}
          resetMetrics={resetMetrics}
          resetAssets={resetAssets}
          alertMessage={alertMessage}
        />
        <MetricColumn
          activeMetrics={activeMetrics}
          setActiveMetrics={setActiveMetrics}
          validAssets={validAssets}
          setValidAssets={setValidAssets}
          getAssets={getAssets}
          getMetrics={getMetrics}
          resetAssets={resetAssets}
          alertMessage={alertMessage}
        />

        <button
          className="btn btn-primary reset-button"
          onClick={handleResetLists}
        >
          Reset Lists
        </button>
      </div>
    </div>
  );
}

export default App;
