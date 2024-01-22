import React from "react";
import { GuideBox, Typography, DropList, Color } from "@midasit-dev/moaui";
import { useRecoilState, useRecoilValue } from "recoil";
import { VarDesignSpectrum, VarDesignSpectrumList } from "./variables";

const CompDesignSpectrum = () => {
	//나중에 추가되면 Recoil에 변수 추가할 것
	const [design_spectrum, setDesign_spectrum] = useRecoilState(VarDesignSpectrum);
	const design_spectrum_list = useRecoilValue(VarDesignSpectrumList);

  return (
    <GuideBox width="100%" row horSpaceBetween>
      <GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
        <Typography
					verCenter
          variant="h1"
          height={30}
          color={Color.secondary.main}
        >
          Design Spectrum
        </Typography>
        <DropList
          width={200}
          itemList={new Map<string, number>(design_spectrum_list as [string, number][])}
          defaultValue={design_spectrum}
          value={design_spectrum}
          onChange={(e: any) => setDesign_spectrum(e.target.value)}
					listWidth={200}
        />
      </GuideBox>
    </GuideBox>
  );
};

export default CompDesignSpectrum;
