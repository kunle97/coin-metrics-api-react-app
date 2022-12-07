import { useState, useEffect } from "react";

export function useCoinMetrics() {
  const [validAssets, setValidAssets] = useState([]);
  const [activeMetrics, setActiveMetrics] = useState([]);
  const [assetReset, setAssetReset] = useState([]);
  const [metricReset, setMetricReset] = useState([]);
  const [alertMessage, setAlertMessage] = useState(<p>Loading...</p>);


  useEffect(() => {
    getAssets();
    getMetrics();
    setAssetReset(validAssets);
    setMetricReset(activeMetrics);
  }, []);

  //retrieve assets from the CoinMetrics Community APIS
  const getAssets = () => {
    fetch("https://community-api.coinmetrics.io/v4/catalog-all/assets")
      .then((response) => response.json())
      .then((data) => {
        setAlertMessage(<p>Loading...</p>);
        //Set the valid assets that have at least one metric
        setValidAssets(
          data.data.filter((asset) => asset.metrics !== undefined)
        );
      });
  };

  // retrieve metrics from the CoinMetrics Community APIS
  const getMetrics = () => {
    fetch("https://community-api.coinmetrics.io/v4/catalog-all/asset-metrics")
      .then((response) => response.json())
      .then((data) => {
        setAlertMessage(<p>Loading...</p>);
        setActiveMetrics(data.data);
      });
  };

  //Sets he validAssets array to the original value
  const resetAssets = () => {
    setValidAssets(assetReset);
  };

  //Sets he activeMetrics array to the original value
  const resetMetrics = () => {
    setActiveMetrics(metricReset);
  };

  return {
    validAssets,
    activeMetrics,
    alertMessage,
    resetAssets,
    resetMetrics,
    getAssets,
    getMetrics,
    setValidAssets,
    setActiveMetrics,
  };
}
