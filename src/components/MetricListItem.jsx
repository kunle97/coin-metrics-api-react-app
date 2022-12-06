import React from "react";

const MetricListItem = (props) => {
  return (
    <li className="metric-list-item" onClick={props.onClick}>
      <h4 className="metric-title">{props.metricTitle}</h4>
      <h5 className="metric-subtitle">{props.metricSubtitle}</h5>
      <p className="metric-description">{props.metricDescription}</p>
    </li>
  );
};

export default MetricListItem;
