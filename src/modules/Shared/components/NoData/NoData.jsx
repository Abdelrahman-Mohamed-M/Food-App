import React from "react";
import nodataImg from "../../../../assets/images/no-data.png";
export default function NoData() {
  return (
    <>
    <div className="text-center">

      <img src={nodataImg} alt="" />
      <h3 className="my-2">No Data!</h3>
    </div>
    </>
  );
}
