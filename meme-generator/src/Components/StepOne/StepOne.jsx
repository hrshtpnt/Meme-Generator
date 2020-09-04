import React from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import ImageSelection from "../ImageSelection/ImageSelection";
import "./StepOne.css";

function StepOne () {
    return (
      <React.Fragment>
        <div className="col-4">
          <ImageUpload />
        </div>
        <div className="col-8">
          <ImageSelection />
        </div>
      </React.Fragment>
    );
}

export default StepOne;
