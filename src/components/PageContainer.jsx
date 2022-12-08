import React from "react";
import Header from "./Header";
import ColumnRow from "./ColumnRow";

const PageContainer = () => {
  return (
    <div className="container">
      <Header title="Coin Metrics Take-Home Assesment" />
      <ColumnRow />
    </div>
  );
};

export default PageContainer;