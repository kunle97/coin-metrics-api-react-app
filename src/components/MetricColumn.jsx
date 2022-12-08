import React from "react";

const MetricColumn = (props) => {
  const metricSearchRef = props.metricSearchRef;

  //Function used to handle searching metrics when search button is clicked
  const searchMetric = (e) => {
    //update metrics when search button is pressed
    const query = metricSearchRef.current.value;
    if (query !== "") {
      props.setActiveMetrics(
        //Check to see if what user types in search bar matches with asset name and iC
        props.activeMetrics.filter(
          (metric) =>
            metric.full_name.toLowerCase().startsWith(query.toLowerCase()) ||
            metric.metric.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else {
      props.getMetrics();
    }
  };

  //handles filtering in asset column when metric is clicked
  const metricOnClick = (e, assets) => {
    if (e.currentTarget.className === "metric-list-item") {
      //select all elements with the asset-list-item class
      const elements = document.querySelectorAll('.metric-list-item');

      //Remove selected class from all items
      elements.forEach((element) => {
        element.classList.remove('list-item-selected');
      });

      e.currentTarget.className = "metric-list-item list-item-selected";
      props.setValidAssets(
        props.validAssets.filter((item) => assets.includes(item.asset))
      );
    } else {
      e.currentTarget.className = "metric-list-item";
      props.getAssets();
      props.resetAssets();
    }
  };

  return (
    <div className="col-md-6 metric-list-container">
      <h3 className="column-title">Metrics</h3>
      <div>
        <div className="input-group mb-3">
          <input
            id="metricSearchBar"
            type="text"
            ref={metricSearchRef}
            className="form-control search-bar"
            placeholder="Search for an Metrics"
            aria-label="Search for an Metrics"
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
        {props.activeMetrics.map((metric) => {
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
      {props.activeMetrics.length === 0 && props.alertMessage}
    </div>
  );
};

export default MetricColumn;