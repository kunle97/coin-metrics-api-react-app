import React from "react";

function AssetListItem(props) {
  return (
    <li className="asset-list-item" onClick={props.onClick}>
      <h4 className="asset-title">{props.full_name} ({props.asset})</h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-right asset-list-icon"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </li>
  );
}

export default AssetListItem;
