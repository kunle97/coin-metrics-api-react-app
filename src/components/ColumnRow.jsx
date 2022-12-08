import React, { useRef } from "react";
import { useCoinMetrics } from "../hooks/useCoinMetrics";
import AssetColumn from "./AssetColumn";
import MetricColumn from "./MetricColumn";

const ColumnRow = () => {
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

  const assetSearchRef = useRef();
  const metricSearchRef = useRef();

  //Function called when the 'reset lists' button is clicked
  const handleResetLists = () => {
    getAssets();
    getMetrics();
    resetAssets();
    resetMetrics();
    assetSearchRef.current.value = "";
    metricSearchRef.current.value = "";
  };

  return (
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
        assetSearchRef={assetSearchRef}
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
        metricSearchRef={metricSearchRef}
      />
      <button
        className="btn btn-primary reset-button"
        onClick={handleResetLists}
      >
        Reset Lists
      </button>
    </div>
  );
};

export default ColumnRow;