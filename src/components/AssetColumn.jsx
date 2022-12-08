import React, { useRef } from "react";

const AssetColumn = (props) => {
  const assetSearchRef = props.assetSearchRef;

  //Function used to handle searching assets when search button is clicked
  const searchAsset = (e) => {
    //update assets when search button is pressed
    const query = assetSearchRef.current.value;
    if (query !== "") {
      props.setValidAssets(
        //Check to see if what user types in search bar matches with asset name and iC
        props.validAssets.filter(
          (asset) =>
            asset.full_name.toLowerCase().startsWith(query.toLowerCase()) ||
            asset.asset.toLowerCase().startsWith(query.toLowerCase())
        )
      );
      if (props.validAssets.length === 0) {
        props.setAlertMessage(<p>No results found</p>);
      }
    } else {
      props.getAssets();
    }
  };

  //handles filtering in metric column when an asset is clicked
  const assetOnClick = (e, metrics) => {
    if (e.currentTarget.className === "asset-list-item") {
      e.currentTarget.className = "asset-list-item list-item-selected";
      const filteredMetrics = [];
      for (var i = 0; i < props.activeMetrics.length; i++) {
        for (var j = 0; j < metrics.length; j++) {
          if (props.activeMetrics[i].metric === metrics[j].metric) {
            filteredMetrics.push(props.activeMetrics[i]);
          }
        }
      }
      props.setActiveMetrics(filteredMetrics);
    } else {
      e.currentTarget.className = "asset-list-item";
      props.getMetrics();
      props.resetMetrics();
    }
  };

  return (
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
        {props.validAssets.map((asset) => {
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
      {props.validAssets.length === 0 && props.alertMessage}
    </div>
  );
};
export default AssetColumn;
