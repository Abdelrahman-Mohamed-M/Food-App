import React from "react";
export default function Header({ title, subTitle, desc, imgUrl,secPading,imgWidth }) {
  return (
    <div className={`header-bg  ${secPading} px-5 m-3 rounded rounded-4 text-white`}>
      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center ">
            <div className="content">
              <h2 className=" fw-bolder">
                {title}
                <span className=" fw-light">{subTitle}</span>
              </h2>
              <p className=" jus fw-normal  pt-1">{desc}</p>
            </div>
          </div>
          <div className="col-md-4 text-end ">
            <img className={imgWidth} src={imgUrl} alt="header-photo" />
          </div>
        </div>
      </div>
    </div>
  );
}
