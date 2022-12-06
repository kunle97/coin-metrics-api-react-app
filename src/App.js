import { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap/css/bootstrap.css";
import AssetListItem from "./components/AssetListItem";
// import "./bootstrap/js/bootstrap"

function App() {
  const [validAssets, setValidAssets] = useState([]);
  const [activeMetrics, setActiveMetrics] = useState([]);
   useEffect(() => {
    getAssetData();
  }, []);
  const getAssetData = () => {
    fetch("https://community-api.coinmetrics.io/v4/catalog/assets")
      .then((response) => response.json())
      .then((data) => {
        console.log(typeof data);
        //TODO: Set the valid assets that have at least one metric
        setValidAssets(data.data);
        console.log("Valid Assets", validAssets);
      });
  };
  const getMetrius = () => {
    fetch("https://community-api.coinmetrics.io/v4/catalog-all/asset-metrics")
      .then((response) => response.json())
      .then((data) => {
        console.log(typeof data);
        //TODO: Set the valid assets that have at least one metric
        setActiveMetrics(data.data);
        console.log("Valid Assets", validAssets);
      });
  };

  const searchAsset = () => {
    //Live update assets when search box is changed
  };

  return (
    <div className="container">
      <div className="form-group"></div>
      <div className="row">
        <div className="col-md-6 asset-list-container">
          <input
            onChange={searchAsset}
            className="form-control"
            placeholder="Search for an asset"
          />
          <ul className="asset-list data-list">
            {validAssets &&
              validAssets.map((asset) => {
                return (
                  <AssetListItem
                    full_name={asset.full_name}
                    asset={asset.asset}
                  />
                );
              })}
          </ul>
        </div>
        <div className="col-md-6 metric-list-container">
          {" "}
          <li className="metric-list-item">
            <h4 className="metric-title">MArket Cap </h4>
            <p>Metric description</p>
          </li>
        </div>
      </div>
      <button className="btn btn-primary" onClick={getAssetData}>
        Load Data
      </button>
    </div>
  );
}

export default App;
