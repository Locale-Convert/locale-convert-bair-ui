import React, { useState } from "react";
import Characteristics from "../Characteristics/Characteristics";
import ProductSpecs from "../ProductSpecs/ProductSpecs";

const DescriptionBlock = ({ description, activeColor }) => {
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  return (
    <div className="desc-characteristics">
      <Characteristics
        description={description}
        onHeightChange={setDescriptionHeight}
      />
      {activeColor && activeColor.specifications?.length > 0 && (
        <ProductSpecs
          specs={activeColor.specifications}
          compareHeight={descriptionHeight}
        />
      )}
    </div>
  );
};

export default DescriptionBlock;
