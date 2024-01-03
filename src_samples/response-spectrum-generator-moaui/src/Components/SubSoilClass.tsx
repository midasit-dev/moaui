import React from "react";
import { Typography, RadioGroup, Radio, GuideBox } from "@midasit-dev/moaui";
import { useRecoilState } from "recoil";
import { VarSiteSubSoilClass } from "./variables";

const CompSubSoilClass = () => {
  // const [site_sub_soil_class, setSite_sub_soil_class] = useRecoilState(VarSiteSubSoilClass);

  const [site_sub_soil_class, setSite_sub_soil_class] = React.useState(1);

  const handleChange = (event: React.ChangeEvent, state: string) => {
    setSite_sub_soil_class(+state);
  };

  return (
    <GuideBox width='100%'>
      <Typography center variant="h1" height={30}>
				Site Sub Soil Class
      </Typography>
      <GuideBox padding={1} width='100%' center>
        <RadioGroup onChange={handleChange} value={site_sub_soil_class} row>
          <Radio name="A" value="1" />
          <Radio name="B" value="2" marginLeft={3} />
          <Radio name="C" value="3" marginLeft={3} />
          <Radio name="D" value="4" marginLeft={3} />
          <Radio name="E" value="5" marginLeft={3} />
        </RadioGroup>
      </GuideBox>
    </GuideBox>
  );
};

export default CompSubSoilClass;
