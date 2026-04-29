import React from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";

export default function CategoriesList() {
  return (
    <div>
      <Header
        title={"Categories "}
        subTitle={"Items"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={groupImg}
        imgWidth={"w-50"}
      />
    </div>
  );
}
