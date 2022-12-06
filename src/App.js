import { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap/css/bootstrap.css";
import AssetListItem from "./components/AssetListItem";
import MetricListItem from "./components/MetricListItem";
import SearchBar from "./components/SearchBar";
// import "./bootstrap/js/bootstrap"

function App() {
  let assetReset = [];
  let metricReset = [];
  const [validAssets, setValidAssets] = useState([]);
  const [activeMetrics, setActiveMetrics] = useState([]);

  const [selectedMetricAssets, setSelectedMetricAssets] = useState([]);

  useEffect(() => {
    getAssetData();
    getMetrics();
  }, []);
  console.log("Active Metrics", activeMetrics);
  console.log("Valid Assets", validAssets);
  
  //Function to retrieve assets from the CoinMetrics Community APIS
  const getAssetData = () => {
    fetch("https://community-api.coinmetrics.io/v4/catalog-all/assets")
      .then((response) => response.json())
      .then((data) => {
        //Set the valid assets that have at least one metric
        setValidAssets(
          data.data.filter((asset) => asset.metrics !== undefined)
        );
        assetReset = data.data.filter((asset) => asset.metrics !== undefined);
      });
  };

  //
  const getMetrics = () => {
    fetch("https://community-api.coinmetrics.io/v4/catalog-all/asset-metrics")
      .then((response) => response.json())
      .then((data) => {
        setActiveMetrics(data.data);
        metricReset = data.data;
      });
  };

  const handleResetAssetList = () => {
    getAssetData();
  };
  const handleResetMetricList = () => {
    getMetrics();
  };

  const searchAsset = (e) => {
    //Live update assets when search box is changed
    const query = e.target.value;
    console.log(query);
    if (query !== "") {
      setValidAssets(
        //Check to see if what user types in search bar matches with asset name and iC
        validAssets.filter(
          (asset) =>
            asset.full_name.toLowerCase().startsWith(query) ||
            asset.asset.toLowerCase().startsWith(query)
        )
      );
    } else {
      getAssetData();
    }
  };
  const searchMetric = (e) => {
    //Live update metrics when search box is changed
    const query = e.target.value;
    console.log(query);
    if (query !== "") {
      setActiveMetrics(
        //Check to see if what user types in search bar matches with asset name and iC
        activeMetrics.filter(
          (metric) =>
            metric.full_name.toLowerCase().startsWith(query) ||
            metric.metric.toLowerCase().startsWith(query)
        )
      );
    } else {
      getMetrics();
    }
  };

  //
  const assetOnClick = (metrics) => {
    // setActiveMetrics(metricReset);
    // console.log("metricReset", metricReset);
    // setActiveMetrics(
    //   filteredActiveMetrics.filter((item, index) =>
    //     metrics[index].includes(item.metric)
    //   )
    // ); //

    const filteredMetrics = [];
    for (var i = 0; i < activeMetrics.length; i++) {
      for (var j = 0; j < metrics.length; j++) {
        if (activeMetrics[i].metric == metrics[j].metric) {
          filteredMetrics.push(activeMetrics[i]);
        }
      }
    }
    setActiveMetrics(filteredMetrics);
  };

  //
  const metricOnClick = (assets) => {
    setValidAssets(validAssets.filter((item) => assets.includes(item.asset))); // set
  };
  return (
    <div className="container">
      <h1>Coin Metrics Tak-Home Assesment</h1>
      <div className="row">
        <div className="col-md-6 asset-list-container">
          <h3>Assets</h3>
          <SearchBar
            onChange={searchAsset}
            onKeyDownsearchAsset
            placeholder="Search for an Assets"
          />
          <ul className="asset-list data-list">
            {validAssets.map((asset) => {
              const metrics = asset.metrics;
              return (
                <AssetListItem
                  onClick={(event) => assetOnClick(metrics)}
                  full_name={asset.full_name}
                  asset={asset.asset}
                />
              );
            })}
          </ul>
          <button
            className="btn btn-primary reset-button"
            onClick={handleResetAssetList}
          >
            Reset Asset List
          </button>
        </div>
        <div className="col-md-6 metric-list-container">
          <h3>Metrics</h3>
          <SearchBar
            onChange={searchMetric}
            onKeyDown={searchMetric}
            placeholder="Search for an Metrics"
          />
          <ul className="metric-list data-list">
            {activeMetrics.map((metric) => {
              const assets = metric.frequencies[0].assets;
              return (
                <MetricListItem
                  onClick={(event) => metricOnClick(assets)}
                  metricTitle={metric.full_name}
                  metricSubtitle={metric.metric}
                  metricDescription={metric.description}
                />
              );
            })}
          </ul>
          <button
            className="btn btn-primary reset-button"
            onClick={handleResetMetricList}
          >
            Reset Metric List
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
