import React from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header-girl.png";
import FillRecipes from "../../../Shared/components/FillRecipes/FillRecipes";

export default function Dashboard({ loginData }) {
  return (
    <div>
      <Header
        title={"Welcome "}
        subTitle={`${loginData?.userName} !!`}
        desc={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerImg}
        secPading={"py-3"}
        imgWidth={"w-75"}
      />
      <FillRecipes recipeAction={"Fill"} />
    </div>
  );
}
