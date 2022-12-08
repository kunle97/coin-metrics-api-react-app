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
    setAlertMessage(<p>Loading...</p>);
    try{
      fetch("https://community-api.coinmetrics.io/v4/catalog-all/assets")
        .then((response) => response.json())
        .then((data) => {
          //Set the valid assets that have at least one metric
          setValidAssets(
            data.data.filter((asset) => asset.metrics !== undefined)
          );
        });
    }catch(error){
      console.log(error);
      setAlertMessage(<p>{error}</p>);
    }
  };

  // retrieve metrics from the CoinMetrics Community APIS
  const getMetrics = () => {
    setAlertMessage(<p>Loading...</p>);
    try{
    fetch("https://community-api.coinmetrics.io/v4/catalog-all/asset-metrics")
      .then((response) => response.json())
      .then((data) => {
        setActiveMetrics(data.data);
      });
    }catch(error){
      console.log(error);
      setAlertMessage(<p>{error}</p>);
    }
  };

  //Sets the validAssets array to the original value when first fetched
  const resetAssets = () => {
    setValidAssets(assetReset);
  };

  //Sets the activeMetrics array to the original value when first fetched
  const resetMetrics = () => {
    setActiveMetrics(metricReset);
  };

  return {
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
  };
}
