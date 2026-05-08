import React, { useContext } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header-girl.png";
import FillRecipes from "../../../Shared/components/FillRecipes/FillRecipes";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

export default function Dashboard() {
  const { loginData } = useContext(AuthContext);
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
