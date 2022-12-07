import { useRef } from "react";
import "./App.css";
import "./bootstrap/css/bootstrap.css";
import { useCoinMetrics } from "./hooks/useCoinMetrics";
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
  } = useCoinMetrics();

  const assetSearchRef = useRef();
  const metricSearchRef = useRef();

  const handleResetLists = () => {
    getAssets();
    getMetrics();
    resetAssets();
    resetMetrics();
  };

  //Function used to handle searching assets when search button is clicked
  const searchAsset = (e) => {
    //update assets when search button is pressed
    const query = assetSearchRef.current.value;
    console.log(query);
    if (query !== "") {
      setValidAssets(
        //Check to see if what user types in search bar matches with asset name and iC
        validAssets.filter(
          (asset) =>
            asset.full_name.toLowerCase().startsWith(query.toLowerCase()) ||
            asset.asset.toLowerCase().startsWith(query.toLowerCase())
        )
      );
      if(validAssets.length == 0){
        setAlertMessage(<p>No results found</p>);
      }
    } else {
      getAssets();
    }
  };

  //Function used to handle searching metrics when search button is clicked
  const searchMetric = (e) => {
    //update metrics when search button is pressed
    const query = metricSearchRef.current.value;
    console.log(query);
    if (query !== "") {
      setActiveMetrics(
        //Check to see if what user types in search bar matches with asset name and iC
        activeMetrics.filter(
          (metric) =>
            metric.full_name.toLowerCase().startsWith(query.toLowerCase()) ||
            metric.metric.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else {
      getMetrics();
    }
  };

  //handles filtering in metric column when an asset is clicked
  const assetOnClick = (e, metrics) => {
    if (e.target.className == "asset-list-item") {
      e.target.className = "asset-list-item list-item-selected";
      const filteredMetrics = [];
      for (var i = 0; i < activeMetrics.length; i++) {
        for (var j = 0; j < metrics.length; j++) {
          if (activeMetrics[i].metric == metrics[j].metric) {
            filteredMetrics.push(activeMetrics[i]);
          }
        }
      }
      setActiveMetrics(filteredMetrics);
    } else {
      e.target.className = "asset-list-item";
      getMetrics();
      resetMetrics();
    }
  };

  //handles filtering in asset column when metric is clicked
  const metricOnClick = (e, assets) => {
    setValidAssets(validAssets.filter((item) => assets.includes(item.asset)));
    e.target.className = "metric-list-item list-item-selected";
  };
  return (
    <div className="container">
      <h1 className="page-title">Coin Metrics Take-Home Assesment</h1>
      <p>
        Select an assset to see its corresponding metrics. Select a metric to
        see its corresponding assets. You may deselect an item to reset the
        other list You may also search for either in thier respective search
        bars. You may use the reset button at the bottom to restore all items to
        each list.
      </p>
      <div className="row">
        <div className="col-md-6 asset-list-container">
          <h3 className="column-title">Assets</h3>
          <div>
            <div className="input-group mb-3">
              <input
                id="assetSearchBar"
                type="text"
                ref={assetSearchRef}
                className="form-control search-bar"
                placeholder="Search for an Assets"
                aria-label="Search for an Assets"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  onClick={(e) => searchAsset(e)}
                  className="btn btn-primary"
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <ul className="asset-list data-list">
            {validAssets.map((asset) => {
              const metrics = asset.metrics;
              return (
                <li
                  className="asset-list-item"
                  onClick={(e) => assetOnClick(e, metrics)}
                >
                  <h4 className="asset-title">
                    {asset.full_name} ({asset.asset})
                  </h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right asset-list-icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </li>
              );
            })}
          </ul>
          {validAssets.length == 0 && alertMessage}
        </div>
        <div className="col-md-6 metric-list-container">
          <h3 className="column-title">Metrics</h3>
          <div>
            <div className="input-group mb-3">
              <input
                id="assetSearchBar"
                type="text"
                ref={metricSearchRef}
                className="form-control search-bar"
                placeholder="Search for an Assets"
                aria-label="Search for an Assets"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  onClick={(e) => searchMetric(e)}
                  className="btn btn-primary"
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <ul className="metric-list data-list">
            {activeMetrics.map((metric) => {
              const assets = metric.frequencies[0].assets;
              return (
                <li
                  className="metric-list-item"
                  onClick={(e) => metricOnClick(e, assets)}
                >
                  <h4 className="metric-title">{metric.full_name}</h4>
                  <h5 className="metric-subtitle">{metric.metric}</h5>
                  <p className="metric-description">{metric.description}</p>
                </li>
              );
            })}
          </ul>
          {activeMetrics.length == 0 && alertMessage}
        </div>
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
